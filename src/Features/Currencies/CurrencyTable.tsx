import type { Currency } from "../../../Types/Currency";

interface CurrencyTableProps {
  currencies: Currency[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (currency: Currency) => void;
  onDelete: (id: number) => void;
}

export default function CurrencyTable({
  currencies,
  isLoading,
  isError,
  onEdit,
  onDelete,
}: CurrencyTableProps) {
  if (isLoading) return <p>Loading currencies...</p>;
  if (isError) return <p>Error loading currencies.</p>;

  return (
    <div className="mt-4">
      {/* جدول للديسكتوب */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-sm font-medium text-gray-600">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Symbol</th>
              <th className="px-4 py-2 border">Rate (to USD)</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{c.id}</td>
                <td className="p-2">{c.currency_code}</td>
                <td className="p-2">{c.currency_name}</td>
                <td className="p-2">{c.symbol ?? "-"}</td>
                <td className="p-2">{c.exchange_rate_to_usd}</td>
                <td className="p-2 text-center space-x-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(c.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block sm:hidden space-y-4 mt-4">
        {currencies.map((c) => (
          <div
            key={c.id}
            className="border rounded-lg shadow-sm p-4 bg-white text-sm"
          >
            <div className="flex justify-between">
              <span className="font-semibold">Code:</span>
              <span>{c.currency_code}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Name:</span>
              <span>{c.currency_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Symbol:</span>
              <span>{c.symbol ?? "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Rate (to USD):</span>
              <span>{c.exchange_rate_to_usd}</span>
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
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
