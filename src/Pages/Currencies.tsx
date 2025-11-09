import { useState } from "react";
import { useCurrencies } from "../Hooks/useCurrencies";
import CurrencyForm from "../Features/Currencies/CurrenciesForm";
import CurrencyTable from "../Features/Currencies/CurrencyTable";
import type { Currency } from "../Types/Currency";

export default function Currencies() {
  const { currenciesQuery, addCurrency, updateCurrency, deleteCurrency } = useCurrencies();
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Currencies</h1>

      <CurrencyForm
        editingCurrency={editingCurrency}
        onCancelEdit={() => setEditingCurrency(null)}
        onAdd={addCurrency.mutate}
        onUpdate={updateCurrency.mutate}
      />

      <CurrencyTable
        currencies={currenciesQuery.data || []}
        isLoading={currenciesQuery.isLoading}
        isError={currenciesQuery.isError}
        onEdit={(currency) => setEditingCurrency(currency)}
        onDelete={deleteCurrency.mutate}
      />
    </div>
  );
}
