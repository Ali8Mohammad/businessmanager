import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosAPI from "../API/axiosAPI"; 
import type { Partner } from "../Types/Partner";

const PARTNERS_KEY = ["partners"];

export const usePartners = () => {
  const queryClient = useQueryClient();

  const partnersQuery = useQuery({
    queryKey: PARTNERS_KEY,
    queryFn: async (): Promise<Partner[]> => {
      const res = await axiosAPI.get("/business-partners");
      return res.data?.data ?? res.data ?? [];
    },
    staleTime: 1000 * 60, 
    keepPreviousData: true,
  });

  const addPartner = useMutation({
    mutationFn: async (partner: any) => {
      const payload = {
        partner_name: partner.partner_name,
        primary_email: partner.primary_email,
        primary_phone_number: partner.primary_phone_number,
        address: partner.address,
        default_currency_code:
          
          partner.default_currency_code ?? "USD",
        notes: partner.notes ?? "",

        
        customer_details: {
          customer_type: partner.customer_type ?? "Individual",
          payment_term: partner.payment_term ?? "Direct",
          credit_limit: partner.credit_limit ? Number(partner.credit_limit) : 0,
        },
        supplier_details: {
          supplier_type: partner.supplier_type ?? "AirlineProvider",
          payment_term: partner.supplier_payment_term ?? "Prepaid",
        },
      };

      const res = await axiosAPI.post("/business-partners", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(PARTNERS_KEY);
    },
  });

const updatePartner = useMutation({
  mutationFn: async (partner: any) => {
    const res = await axiosAPI.post(`/business-partners/${partner.id}`, {
      _method: "PUT",
      ...partner,
    });
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(PARTNERS_KEY);
  },
});

  
  const deletePartner = useMutation({
    mutationFn: async (id: number) => {
      const res = await axiosAPI.delete(`/business-partners/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(PARTNERS_KEY),
  });

  return {
    partnersQuery,
    addPartner,
    updatePartner,
    deletePartner,
  };
};
