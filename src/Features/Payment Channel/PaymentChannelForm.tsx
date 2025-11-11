import { useEffect, useState } from "react";
import type { PaymentChannel } from "../../Types/PaymentChannel";
import { useCurrencies } from "../../Hooks/useCurrencies";
import { usePaymentChannels } from "../../Hooks/UsePaymentChannel";

interface Props {
  editingChannel: PaymentChannel | null;
  onAdd: (data: Omit<PaymentChannel, "id">) => void;
  onUpdate: (data: PaymentChannel) => void;
  onCancelEdit: () => void;
}

export default function PaymentChannelForm({ editingChannel, onAdd, onUpdate, onCancelEdit }: Props) {
  const { currenciesQuery } = useCurrencies();
  const { channelsQuery } = usePaymentChannels();

  const [formData, setFormData] = useState<Omit<PaymentChannel, "id">>({
    channel_name: "",
    channel_type: "",
    default_currency_code: "",
    is_active: true,
  });

  const predefinedChannelNames = [
    "PayPal",
    "Credit Card",
    "Bank Transfer",
    "Cash",
    "Western Union",
    "Apple Pay",
    "Google Pay",
    "Crypto Wallet",
  ];

  useEffect(() => {
    if (editingChannel) {
      setFormData(editingChannel);
    } else {
      setFormData({
        channel_name: "",
        channel_type: "",
        default_currency_code: "",
        is_active: true,
      });
    }
  }, [editingChannel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingChannel) {
      onUpdate({ ...formData, id: editingChannel.id });
    } else {
      onAdd(formData);
    }
    onCancelEdit();
  };

  if (currenciesQuery.isLoading || channelsQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (currenciesQuery.isError || channelsQuery.isError) {
    return <p>Error loading data.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-sm mb-6 bg-white">
      <div className="flex flex-col gap-3">
        {/* Channel name dropdown */}
        <select
          value={formData.channel_name}
          onChange={(e) => setFormData({ ...formData, channel_name: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Channel Name</option>
          {predefinedChannelNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {/* Channel type dropdown */}
        <select
          value={formData.channel_type}
          onChange={(e) => setFormData({ ...formData, channel_type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Channel Type</option>
          {channelsQuery.data?.map((channel: any) => (
            <option key={channel.id} value={channel.channel_type}>
              {channel.channel_type}
            </option>
          ))}
        </select>
        <select
          value={String(formData.default_currency_code || "")}
          onChange={(e) =>
            setFormData({
              ...formData,
              default_currency_code: Number(e.target.value), 
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Select Currency</option>
          {currenciesQuery.data?.map((currency: any) => (
            <option key={currency.id} value={currency.id}>
              {currency.currency_code}
            </option>
          ))}
        </select>


        {/* Active toggle */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          />
          Active
        </label>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingChannel ? "Update" : "Add"}
          </button>
          {editingChannel && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
