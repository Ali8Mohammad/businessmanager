import { useState } from "react";
import type { TransactionLog } from "../../Types/TransactionLog";

interface TransactionFormProps {
  onSubmit: (data: TransactionLog) => void;
  currencies: any[];
  partners: any[];
  channels: any[];
}

export default function TransactionForm({
  onSubmit,
  currencies,
  partners,
  channels,
}: TransactionFormProps) {
  const [form, setForm] = useState<TransactionLog>({
    statement: "",
    debits: [
      {
        to_account_type: "",
        to_account_id: "",
        debit_amount: "",
        debit_currency_code: "",
      },
    ],
    splits: [
      {
        account_type: "",
        account_id: "",
        credit_amount: "",
        credit_currency_code: "",
      },
    ],
  } as any);

  const handleChange = (path: string, value: any) => {
    const keys = path.split(".");
    setForm((prev: any) => {
      const updated = { ...prev };
      let nested = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-4 sm:p-6 space-y-6 border max-w-5xl mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center sm:text-left">
        New Transaction
      </h2>

      {/* Statement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Statement
        </label>
        <input
          type="text"
          value={form.statement}
          onChange={(e) => handleChange("statement", e.target.value)}
          placeholder="Enter transaction statement"
          className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Debit Section */}
      <div className="bg-gray-50 p-4 rounded-xl border space-y-4">
        <h3 className="font-semibold text-lg text-blue-700">Debit Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Debit Account
            </label>
            <select
              value={form.debits[0].to_account_id}
              onChange={(e) => {
                const id = e.target.value;
                const account = channels.find((c) => c.id === Number(id));
                handleChange("debits.0.to_account_id", id);
                handleChange("debits.0.to_account_type", "App\\Models\\PaymentChannel");
                handleChange("debits.0.debit_currency_code", account?.default_currency_code || "");
              }}
              className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select channel</option>
              {channels.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.channel_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Debit Amount
            </label>
            <input
              type="number"
              value={form.debits[0].debit_amount}
              onChange={(e) => handleChange("debits.0.debit_amount", e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Debit Currency
            </label>
            <select
              value={form.debits[0].debit_currency_code}
              onChange={(e) =>
                handleChange("debits.0.debit_currency_code", e.target.value)
              }
              className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select currency</option>
              {currencies.map((cur) => (
                <option key={cur.id} value={cur.id}>
                  {cur.currency_code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Credit Section */}
      <div className="bg-gray-50 p-4 rounded-xl border space-y-4">
        <h3 className="font-semibold text-lg text-green-700">Credit Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Credit Account
            </label>
            <select
              value={form.splits[0].account_id}
              onChange={(e) => {
                const id = e.target.value;
                const account = partners.find((p) => p.id === Number(id));
                handleChange("splits.0.account_id", id);
                handleChange("splits.0.account_type", "App\\Models\\BusinessPartner");
                handleChange("splits.0.credit_currency_code", account?.default_currency_code || "");
              }}
              className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select partner</option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.partner_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Credit Amount
            </label>
            <input
              type="number"
              value={form.splits[0].credit_amount}
              onChange={(e) => handleChange("splits.0.credit_amount", e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Credit Currency
            </label>
            <select
              value={form.splits[0].credit_currency_code}
              onChange={(e) =>
                handleChange("splits.0.credit_currency_code", e.target.value)
              }
              className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select currency</option>
              {currencies.map((cur) => (
                <option key={cur.id} value={cur.id}>
                  {cur.currency_code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}
