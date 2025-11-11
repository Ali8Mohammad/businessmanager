import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { TransactionLog } from "../Types/TransactionLog";

const API_URL = "https://accountant.tap2see.net/app/public/api/v1/transaction-logs";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    Accept: "application/json",
  },
});

export function useTransactionLogs() {
  const queryClient = useQueryClient();

  const transactionLogsQuery = useQuery({
    queryKey: ["transactionLogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("");
      return res.data.data;
    },
  });

  const addTransactionLog = useMutation({
    mutationFn: async (data: TransactionLog) => {
      const res = await axiosInstance.post("", data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionLogs"] }),
  });

 const updateTransactionLog = useMutation({
  mutationFn: async (data: TransactionLog) => {
    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("statement", data.statement || "");
    formData.append("notes", data.notes || "");

    formData.append("debits[0][to_account_type]", "App\\Models\\PaymentChannel");
    formData.append("debits[0][to_account_id]", String(data.debits?.[0]?.to_account_id || 1));
    formData.append("debits[0][debit_currency_code]", String(data.debits?.[0]?.debit_currency_code || 4));
    formData.append("debits[0][debit_amount]", String(data.debits?.[0]?.debit_amount || 0));

    formData.append("splits[0][account_type]", "App\\Models\\BusinessPartner");
    formData.append("splits[0][account_id]", String(data.splits?.[0]?.account_id || 9));
    formData.append("splits[0][credit_currency_code]", String(data.splits?.[0]?.credit_currency_code || 4));
    formData.append("splits[0][credit_amount]", String(data.splits?.[0]?.credit_amount || 0));
    formData.append("splits[0][memo]", data.splits?.[0]?.memo || "");

    const res = await axiosInstance.post(`/${data.id}`, formData);
    return res.data;
  },
  onSuccess: () =>
    queryClient.invalidateQueries({ queryKey: ["transactionLogs"] }),
});


  const deleteTransactionLog = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/${id}`);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionLogs"] }),
  });

  const confirmTransactionLog = useMutation({
    mutationFn: async (id: number) => {
      const res = await axiosInstance.post(`/${id}/confirm`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionLogs"] }),
  });

  return {
    transactionLogsQuery,
    addTransactionLog,
    updateTransactionLog,
    deleteTransactionLog,
    confirmTransactionLog,
  };
}
