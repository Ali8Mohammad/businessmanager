import { useState } from "react";
import type { TransactionLog } from "../../Types/TransactionLog";

interface Props {
  onAdd: (log: TransactionLog) => void;
}

export default function TransactionForm({ onAdd }: Props) {
  const [form, setForm] = useState<TransactionLog>({
    statement: "",
    notes: "",
    debits: [
      {
        to_account_type: "App\\Models\\PaymentChannel",
        to_account_id: 1,
        debit_currency_code: "USD",
        debit_amount: 0,
        exchange_rate: 1,
      },
    ],
    splits: [
      {
        account_type: "App\\Models\\BusinessPartner",
        account_id: 1,
        credit_currency_code: "USD",
        credit_amount: 0,
        memo: "",
        exchange_rate: 1,
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 bg-white border p-4 rounded-xl shadow"
    >
      <div>
        <label className="block mb-1 font-semibold">Statement</label>
        <input
          name="statement"
          value={form.statement}
          onChange={handleChange}
          placeholder="Statement title"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Notes</label>
        <input
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Extra notes"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Debit Amount</label>
        <input
          type="number"
          value={form.debits[0].debit_amount}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              debits: [
                {
                  ...prev.debits[0],
                  debit_amount: Number(e.target.value),
                },
              ],
            }))
          }
          placeholder="5000"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Credit Amount</label>
        <input
          type="number"
          value={form.splits[0].credit_amount}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              splits: [
                {
                  ...prev.splits[0],
                  credit_amount: Number(e.target.value),
                },
              ],
            }))
          }
          placeholder="5000"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="col-span-2 text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}
