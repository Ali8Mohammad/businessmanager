import { useState } from "react";
import { usePartners } from "../Hooks/usePartners";
import PartnerTable from "../Features/Partners/Components/PartnerTable";
import PartnerForm from "../Features/Partners/Components/PartnerForm";
import type { Partner } from "../Types/Partner";

export default function Partners() {
  const { partnersQuery, addPartner, deletePartner } = usePartners();
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Business Partners</h1>

      <PartnerForm
        key={editingPartner ? `edit-${editingPartner.id}` : "new"} 
        onAdd={addPartner.mutate}
        editingPartner={editingPartner}
        onCancelEdit={() => setEditingPartner(null)} />

      <PartnerTable
        partners={partnersQuery.data || []}
        isLoading={partnersQuery.isLoading}
        isError={partnersQuery.isError}
        onDelete={deletePartner.mutate}
        onEdit={setEditingPartner} // 
      />
    </div>
  );
}
