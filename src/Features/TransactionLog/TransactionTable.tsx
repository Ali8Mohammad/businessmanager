import React, { useState } from "react";
import { useTransactionLogs } from "../../Hooks/useTransactionLogs";
import { usePaymentChannels } from "../../Hooks/UsePaymentChannel";
import { usePartners } from "../../Hooks/UsePartners";
import { useCurrencies } from "../../Hooks/useCurrencies";

export default function TransactionsTable() {
  const { transactionLogsQuery, updateTransactionLog, deleteTransactionLog } = useTransactionLogs();
  const { channelsQuery: paymentChannelsQuery } = usePaymentChannels();
  const { partnersQuery: businessPartnersQuery } = usePartners();
  const { currenciesQuery } = useCurrencies();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<any>({});

  if (
    transactionLogsQuery.isLoading ||
    paymentChannelsQuery.isLoading ||
    businessPartnersQuery.isLoading ||
    currenciesQuery.isLoading
  )
    return <p>Loading...</p>;

  if (
    transactionLogsQuery.isError ||
    paymentChannelsQuery.isError ||
    businessPartnersQuery.isError ||
    currenciesQuery.isError
  )
    return <p>Error loading data.</p>;

  const handleEdit = (log: any) => {
    setEditingId(log.id);
    setEditedData({
      ...log,
      debit_account_id: log.debits?.[0]?.to_account_id || "",
      debit_currency_code: log.debits?.[0]?.debit_currency_code || "",
      debit_amount: log.debits?.[0]?.debit_amount || "",
      credit_account_id: log.splits?.[0]?.account_id || "",
      credit_currency_code: log.splits?.[0]?.credit_currency_code || "",
      credit_amount: log.splits?.[0]?.credit_amount || "",
    });
  };

  const handleChange = (field: string, value: any) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleSave = (id: number) => {
    if (Number(editedData.debit_amount) !== Number(editedData.credit_amount)) {
      setPopupMessage("❌The debit amount must be exactly equal to the credit amount.");
      setShowPopup(true);
      return;
    }

    const payload = {
      id,
      statement: editedData.statement,
      debits: [
        {
          to_account_type: "App\\Models\\PaymentChannel",
          to_account_id: editedData.debit_account_id,
          debit_amount: editedData.debit_amount,
          debit_currency_code: editedData.debit_currency_code,
        },
      ],
      splits: [
        {
          account_type: "App\\Models\\BusinessPartner",
          account_id: editedData.credit_account_id,
          credit_amount: editedData.credit_amount,
          credit_currency_code: editedData.credit_currency_code,
        },
      ],
    };

    updateTransactionLog.mutate(payload, {
      onSuccess: () => setEditingId(null),
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData({});
  };

  const logs = transactionLogsQuery.data || [];

  return (
    <div className="mt-6 w-full max-w-7xl mx-auto">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Statement</th>
              <th className="p-2 border">Debit Account</th>
              <th className="p-2 border">Debit Amount</th>
              <th className="p-2 border">Debit Currency</th>
              <th className="p-2 border">Credit Account</th>
              <th className="p-2 border">Credit Amount</th>
              <th className="p-2 border">Credit Currency</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log: any, index: number) => {
              const isEditing = editingId === log.id;
              return (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{index + 1}</td>

                  {/* Statement */}
                  <td className="p-2 border">
                    {isEditing ? (
                      <input
                        value={editedData.statement || ""}
                        onChange={(e) => handleChange("statement", e.target.value)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      log.statement
                    )}
                  </td>

                  {/* Debit Account */}
                  <td className="p-2 border">
                    {isEditing ? (
                      <select
                        value={editedData.debit_account_id || ""}
                        onChange={(e) => handleChange("debit_account_id", e.target.value)}
                        className="border p-1 rounded w-full"
                      >
                        <option value="">Select</option>
                        {paymentChannelsQuery.data?.map((p: any) => (
                          <option key={p.id} value={p.id}>
                            {p.channel_name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      log.debits?.[0]?.account?.channel_name || "-"
                    )}
                  </td>

                  {/* Debit Amount */}
                  <td className="p-2 border text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedData.debit_amount || ""}
                        onChange={(e) => handleChange("debit_amount", e.target.value)}
                        className="border p-1 rounded w-full text-right"
                      />
                    ) : (
                      log.debits?.[0]?.debit_amount
                    )}
                  </td>

                  {/* Debit Currency */}
                  <td className="p-2 border text-center">
                    {isEditing ? (
                      <select
                        value={editedData.debit_currency_code || ""}
                        onChange={(e) => handleChange("debit_currency_code", e.target.value)}
                        className="border p-1 rounded w-full"
                      >
                        <option value="">Select</option>
                        {currenciesQuery.data?.map((c: any) => (
                          <option key={c.id} value={c.id}>
                            {c.currency_code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      log.debits?.[0]?.currency?.currency_code
                    )}
                  </td>

                  {/* Credit Account */}
                  <td className="p-2 border">
                    {isEditing ? (
                      <select
                        value={editedData.credit_account_id || ""}
                        onChange={(e) => handleChange("credit_account_id", e.target.value)}
                        className="border p-1 rounded w-full"
                      >
                        <option value="">Select</option>
                        {businessPartnersQuery.data?.map((b: any) => (
                          <option key={b.id} value={b.id}>
                            {b.partner_name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      log.splits?.[0]?.account?.partner_name || "-"
                    )}
                  </td>

                  {/* Credit Amount */}
                  <td className="p-2 border text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedData.credit_amount || ""}
                        onChange={(e) => handleChange("credit_amount", e.target.value)}
                        className="border p-1 rounded w-full text-right"
                      />
                    ) : (
                      log.splits?.[0]?.credit_amount
                    )}
                  </td>

                  {/* Credit Currency */}
                  <td className="p-2 border text-center">
                    {isEditing ? (
                      <select
                        value={editedData.credit_currency_code || ""}
                        onChange={(e) => handleChange("credit_currency_code", e.target.value)}
                        className="border p-1 rounded w-full"
                      >
                        <option value="">Select</option>
                        {currenciesQuery.data?.map((c: any) => (
                          <option key={c.id} value={c.id}>
                            {c.currency_code}
                          </option>
                        ))}
                      </select>
                    ) : (
                      log.splits?.[0]?.currency?.currency_code
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-2 border text-center">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleSave(log.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-400 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(log)}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTransactionLog.mutate(log.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {logs.map((log: any, index: number) => {
          const isEditing = editingId === log.id;
          return (
            <div key={log.id} className="bg-white border rounded-xl p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-2">
                {index + 1}. {log.statement}
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <span>Debit:</span>
                <span>{log.debits?.[0]?.account?.channel_name || "-"}</span>
                <span>Credit:</span>
                <span>{log.splits?.[0]?.account?.partner_name || "-"}</span>
                <span>Amount:</span>
                <span>
                  {log.debits?.[0]?.debit_amount} /{" "}
                  {log.splits?.[0]?.credit_amount}
                </span>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleEdit(log)}
                  className="flex-1 bg-blue-500 text-white py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTransactionLog.mutate(log.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
            <p className="text-gray-800 mb-4">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
