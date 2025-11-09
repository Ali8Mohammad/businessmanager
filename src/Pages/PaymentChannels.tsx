import { useState } from "react";
import { usePaymentChannels } from "../Hooks/UsePaymentChannel";
import PaymentChannelForm from ".././Features/Payment Channel/PaymentChannelForm";
import PaymentChannelTable from ".././Features/Payment Channel/PaymentChannelTable";
import type { PaymentChannel } from "../Types/PaymentChannel";

export default function PaymentChannels() {
  const { channelsQuery, addChannel, updateChannel, deleteChannel } = usePaymentChannels();
  const [editingChannel, setEditingChannel] = useState<PaymentChannel | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Channels</h1>

      <PaymentChannelForm
        editingChannel={editingChannel}
        onAdd={addChannel.mutate}
        onUpdate={updateChannel.mutate}
        onCancelEdit={() => setEditingChannel(null)}
      />

      <PaymentChannelTable
        channels={channelsQuery.data || []}
        isLoading={channelsQuery.isLoading}
        isError={channelsQuery.isError}
        onEdit={setEditingChannel}
        onDelete={deleteChannel.mutate}
      />
    </div>
  );
}
