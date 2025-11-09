import { useForm } from "react-hook-form";
import type { Currency } from "../../Types/Currency";

interface CurrencyFormProps {
  editingCurrency: Currency | null;
  onAdd: (data: Partial<Currency>) => void;
  onUpdate: (data: Currency) => void;
  onCancelEdit: () => void;
}

export default function CurrencyForm({
  editingCurrency,
  onAdd,
  onUpdate,
  onCancelEdit,
}: CurrencyFormProps) {
  const { register, handleSubmit, reset } = useForm<Currency>({
    defaultValues: editingCurrency || {},
  });

  const onSubmit = (data: Currency) => {
    if (editingCurrency) {
      onUpdate({ ...editingCurrency, ...data });
    } else {
      onAdd(data);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow rounded-2xl p-6 mb-6 space-y-3 max-w-2xl"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingCurrency ? "Edit Currency" : "Add Currency"}
      </h2>

      <input
        {...register("currency_code", { required: true })}
        placeholder="Currency Code (e.g. USD)"
        className="input"
      />
      <input
        {...register("currency_name", { required: true })}
        placeholder="Currency Name"
        className="input"
      />
      <input
        {...register("symbol")}
        placeholder="Symbol (e.g. $)"
        className="input"
      />
      <input
        {...register("exchange_rate_to_usd")}
        placeholder="Exchange Rate to USD"
        type="number"
        step="0.0001"
        className="input"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          {editingCurrency ? "Update" : "Add"}
        </button>
        {editingCurrency && (
          <button
            type="button"
            onClick={() => {
              reset();
              onCancelEdit();
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
