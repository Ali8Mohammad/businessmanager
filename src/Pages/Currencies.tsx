import { useState } from "react";
import { useCurrencies } from "../Hooks/useCurrencies";
import CurrencyForm from "../Features/Currencies/CurrenciesForm";
import CurrencyTable from "../Features/Currencies/CurrencyTable";
import type { Currency } from "../Types/Currency";

export default function Currencies() {
  const { currenciesQuery, addCurrency, updateCurrency, deleteCurrency } = useCurrencies();
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAdd = (data: Partial<Currency>) => {
    addCurrency.mutate(data, {
      onError: (error: any) => {
        if (error.response?.status === 422) {
          const msg = error.response?.data?.errors?.currency_code?.[0] || "Currency code already exists.";
          setErrorMessage(msg);
          setTimeout(() => setErrorMessage(null), 3000); 
        }
      },
    });
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Currencies</h1>

      {errorMessage && (
        <div className="fixes top-1/2 right-1/2 transform -translate-x-1 -translate-y-1 
                  h-[200px] w-[500px] bg-black-900 text-center rounded-[10px] font-black shadow-lg">
          <span>error Message</span>
          <button
            onClick={() => setErrorMessage(null)}
            className="absolute top-[12px] right-[10px] bg-white border border-black 
                   rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-100"
          >
            × 
          </button>
        </div>
       )}  

      <CurrencyForm
        editingCurrency={editingCurrency}
        onCancelEdit={() => setEditingCurrency(null)}
        onAdd={handleAdd}
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
