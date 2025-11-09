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
  if (isLoading) return <p>Loading partners...</p>;
  if (isError) return <p>Error loading partners.</p>;

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-sm font-medium text-gray-600">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Currency</th>
            <th className="px-4 py-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.partner_name ?? "-"}</td>
              <td className="p-2">{p.primary_email ?? "-"}</td>
              <td className="p-2">{p.primary_phone_number ?? "-"}</td>
              <td className="p-2">{p.address ?? "-"}</td>
              <td className="p-2">{p.default_currency_code ?? "-"}</td>
              <td className="p-2 flex justify-center gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
  );
}
