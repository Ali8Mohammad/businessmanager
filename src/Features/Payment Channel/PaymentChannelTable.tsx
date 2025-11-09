import type { PaymentChannel } from "../../Types/PaymentChannel";

interface Props {
  channels: PaymentChannel[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (channel: PaymentChannel) => void;
  onDelete: (id: number) => void;
}

export default function PaymentChannelTable({ channels, isLoading, isError, onEdit, onDelete }: Props) {
  if (isLoading) return <p>Loading payment channels...</p>;
  if (isError) return <p>Error loading payment channels.</p>;

  return (
    <table className="min-w-full border border-gray-300 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Type</th>
          <th className="p-2 border">Currency</th>
          <th className="p-2 border">Active</th>
          <th className="p-2 border text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {channels.map((c) => (
          <tr key={c.id} className="border-t">
            <td className="p-2">{c.channel_name}</td>
            <td className="p-2">{c.channel_type}</td>
            <td className="p-2">{c.default_currency_code}</td>
            <td className="p-2">{c.is_active ? "Yes" : "No"}</td>
            <td className="p-2 flex gap-2 justify-center">
              <button
                onClick={() => onEdit(c)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(c.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
