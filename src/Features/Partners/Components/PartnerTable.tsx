import type { Partner } from "../../../Types/Partner";

interface PartnerTableProps {
  partners: Partner[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: number) => void;
  onEdit: (partner: Partner) => void;
}

export default function PartnerTable({
  partners,
  isLoading,
  isError,
  onDelete,
  onEdit,
}: PartnerTableProps) {
  if (isLoading)
    return <p className="text-center py-4 text-gray-600">Loading partners...</p>;
  if (isError)
    return <p className="text-center py-4 text-red-500">Error loading partners.</p>;

  return (
    <div className="mt-6 w-full overflow-x-auto">
      
      <div className="inline-block min-w-full align-middle">
        <div className="border border-gray-200 rounded-xl shadow-sm hidden sm:block">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left whitespace-nowrap">Name</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Email</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Phone</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Address</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Currency</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {partners.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {p.partner_name ?? "-"}
                  </td>
                  <td className="px-4 py-3">{p.primary_email ?? "-"}</td>
                  <td className="px-4 py-3">{p.primary_phone_number ?? "-"}</td>
                  <td className="px-4 py-3">{p.address ?? "-"}</td>
                  <td className="px-4 py-3 text-center">
                    {p.default_currency_code ?? "-"}
                  </td>
                  <td className="px-4 py-3 flex flex-wrap justify-center gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-yellow-600 transition"
                      onClick={() => onEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-red-600 transition"
                      onClick={() => onDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="block sm:hidden mt-4 space-y-4">
        {partners.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-100"
          >
            <h3 className="font-semibold text-gray-900 mb-2">
              {p.partner_name ?? "Unnamed Partner"}
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {p.primary_email ?? "-"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Phone:</strong> {p.primary_phone_number ?? "-"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Address:</strong> {p.address ?? "-"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Currency:</strong> {p.default_currency_code ?? "-"}
            </p>
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs hover:bg-yellow-600"
                onClick={() => onEdit(p)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600"
                onClick={() => onDelete(p.id)}
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
