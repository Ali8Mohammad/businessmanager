import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { PaymentChannel } from "../Types/PaymentChannel";

const API_URL = "https://accountant.tap2see.net/app/public/api/v1/payment-channels";
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
});

export function usePaymentChannels() {
  const queryClient = useQueryClient();

  const channelsQuery = useQuery({
    queryKey: ["paymentChannels"],
    queryFn: async () => {
      const res = await axiosInstance.get("");
      return res.data.data;
    },
  });

  const addChannel = useMutation({
    mutationFn: async (newChannel: Omit<PaymentChannel, "id">) => {
      const formData = new FormData();
      formData.append("channel_name", newChannel.channel_name);
      formData.append("channel_type", newChannel.channel_type);
      formData.append("default_currency_code", newChannel.default_currency_code);
      formData.append("is_active", newChannel.is_active ? "1" : "0");

      const res = await axiosInstance.post("", formData);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["paymentChannels"] }),
  });

  const updateChannel = useMutation({
    mutationFn: async (updated: PaymentChannel) => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("channel_name", updated.channel_name);
      formData.append("channel_type", updated.channel_type);
      formData.append("default_currency_code", updated.default_currency_code);
      formData.append("is_active", updated.is_active ? "1" : "0");

      const res = await axiosInstance.post(`/${updated.id}`, formData);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["paymentChannels"] }),
  });

  const deleteChannel = useMutation({
    mutationFn: async (id: number) => {
      const res = await axiosInstance.delete(`/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["paymentChannels"] }),
  });

  return { channelsQuery, addChannel, updateChannel, deleteChannel };
}
