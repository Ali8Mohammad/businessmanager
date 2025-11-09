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
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-sm font-medium text-gray-600">
          <tr>
            <th className="px-4 py-2 border">Code</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Symbol</th>
            <th className="px-4 py-2 border">Rate (to USD)</th>
            <th className="px-4 py-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((c) => (
            <tr key={c.id} className="border-t">
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
  );
}
