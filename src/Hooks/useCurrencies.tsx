import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosAPI from "../API/axiosAPI";
import type { Currency } from "../Types/Currency";

const CURRENCIES_KEY = ["currencies"];

export const useCurrencies = () => {
  const queryClient = useQueryClient();


  const currenciesQuery = useQuery({
    queryKey: CURRENCIES_KEY,
    queryFn: async (): Promise<Currency[]> => {
      const res = await axiosAPI.get("/currencies?per_page=1000&page=1");
      console.log("Currencies full page response:", res.data);
      return res.data?.data ?? [];
      // console.log("Full currencies response:", res.data);
      // // console.log("Full currencies response:", res.data.data || []);
      // return res.data?.data || [];
    },
    staleTime: 1000 * 60,
    keepPreviousData: true,
  });


  const addCurrency = useMutation({
    mutationFn: async (currency: Partial<Currency>) => {
      const payload = {
        currency_code: currency.currency_code,
        currency_name: currency.currency_name,
        symbol: currency.symbol,
        exchange_rate_to_usd: Number(currency.exchange_rate_to_usd) || 1,
      };
      const res = await axiosAPI.post("/currencies", payload);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(CURRENCIES_KEY),
  });


  const updateCurrency = useMutation({
    mutationFn: async (currency: Currency) => {
      const payload = {
        currency_code: currency.currency_code,
        currency_name: currency.currency_name,
        symbol: currency.symbol,
        exchange_rate_to_usd: Number(currency.exchange_rate_to_usd),
      };
      const res = await axiosAPI.put(`/currencies/${currency.id}`, payload);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(CURRENCIES_KEY),
  });

  const deleteCurrency = useMutation({
    mutationFn: async (id: number) => {
      const res = await axiosAPI.delete(`/currencies/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(CURRENCIES_KEY),
  });

  return {
    currenciesQuery,
    addCurrency,
    updateCurrency,
    deleteCurrency,
  };
};
