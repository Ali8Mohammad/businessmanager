import { useEffect, useState } from "react";
import type { PaymentChannel } from "../../Types/PaymentChannel";

interface Props {
  editingChannel: PaymentChannel | null;
  onAdd: (data: Omit<PaymentChannel, "id">) => void;
  onUpdate: (data: PaymentChannel) => void;
  onCancelEdit: () => void;
}

export default function PaymentChannelForm({ editingChannel, onAdd, onUpdate, onCancelEdit }: Props) {
  const [formData, setFormData] = useState<Omit<PaymentChannel, "id">>({
    channel_name: "",
    channel_type: "",
    default_currency_code: "",
    is_active: true,
  });

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

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-sm mb-6 bg-white">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Channel Name"
          value={formData.channel_name}
          onChange={(e) => setFormData({ ...formData, channel_name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Channel Type"
          value={formData.channel_type}
          onChange={(e) => setFormData({ ...formData, channel_type: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Default Currency Code"
          value={formData.default_currency_code}
          onChange={(e) => setFormData({ ...formData, default_currency_code: e.target.value })}
          className="border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          />
          Active
        </label>

        <div className="flex gap-3 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingChannel ? "Update" : "Add"}
          </button>
          {editingChannel && (
            <button type="button" onClick={onCancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
