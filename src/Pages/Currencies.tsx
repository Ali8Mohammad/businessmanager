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
          const msg =
            error.response?.data?.errors?.currency_code?.[0] ||
            "Currency code already exists.";
          setErrorMessage(msg);
        }
      },
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">Currencies</h1>

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[400px] relative text-center">
            <h2 className="text-lg font-semibold mb-3 text-red-600">Validation Error</h2>
            <p className="text-gray-700">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6">
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
    </div>
  );
}
