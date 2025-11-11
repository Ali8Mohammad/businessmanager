import type { PaymentChannel } from "../../Types/PaymentChannel";

interface Props {
  channels: PaymentChannel[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (channel: PaymentChannel) => void;
  onDelete: (id: number) => void;
}

export default function PaymentChannelTable({
  channels,
  isLoading,
  isError,
  onEdit,
  onDelete,
}: Props) {
  if (isLoading) return <p>Loading payment channels...</p>;
  if (isError) return <p>Error loading payment channels.</p>;

  return (
    <div className="mt-4">
      {/* جدول للديسكتوب */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-sm font-medium text-gray-600">
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
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{c.channel_name}</td>
                <td className="p-2">{c.channel_type}</td>
                <td className="p-2">{c.default_currency_code}</td>
                <td className="p-2">{c.is_active ? "Yes" : "No"}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(c)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(c.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* عرض موبايل */}
      <div className="block sm:hidden space-y-4 mt-4">
        {channels.map((c) => (
          <div
            key={c.id}
            className="border rounded-lg shadow-sm p-4 bg-white text-sm"
          >
            <div className="flex justify-between">
              <span className="font-semibold">Name:</span>
              <span>{c.channel_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Type:</span>
              <span>{c.channel_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Currency:</span>
              <span>{c.default_currency_code}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Active:</span>
              <span>{c.is_active ? "Yes" : "No"}</span>
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => onEdit(c)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(c.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
