import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { TransactionLog } from "../Types/TransactionLog";

const API_URL = "https://accountant.tap2see.net/app/public/api/v1/transaction-logs";

const token = localStorage.getItem("authToken");


const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
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
      const formData = new FormData();
      formData.append("statement", data.statement);
      formData.append("notes", data.notes || "");
      
      
      data.debits.forEach((debit, index) => {
        Object.entries(debit).forEach(([key, value]) =>
          formData.append(`debits[${index}].${key}`, String(value))
        );
      });
      
      data.splits.forEach((split, index) => {
        Object.entries(split).forEach(([key, value]) =>
          formData.append(`splits[${index}].${key}`, String(value))
        );
      });

      const res = await axiosInstance.post("", formData);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionLogs"] }),
  });

  const updateTransactionLog = useMutation({
    mutationFn: async (data: TransactionLog) => {
      if (!data.id) throw new Error("Transaction Log ID is required");

      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("statement", data.statement);
      formData.append("notes", data.notes || "");

      data.debits.forEach((debit, index) => {
        Object.entries(debit).forEach(([key, value]) =>
          formData.append(`debits[${index}].${key}`, String(value))
        );
      });

      data.splits.forEach((split, index) => {
        Object.entries(split).forEach(([key, value]) =>
          formData.append(`splits[${index}].${key}`, String(value))
        );
      });

      const res = await axiosInstance.post(`/${data.id}`, formData);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactionLogs"] }),
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
