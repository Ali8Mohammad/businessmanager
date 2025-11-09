import { useTransactionLogs } from "../../Hooks/useTransactionLogs";
import type { TransactionLog } from "../../Types/TransactionLog";
import { useState } from "react";

export default function TransactionTable() {
  const { transactionLogsQuery, deleteTransactionLog, confirmTransactionLog } =
    useTransactionLogs();
  const [editingLog, setEditingLog] = useState<TransactionLog | null>(null);

  
  if (transactionLogsQuery.isLoading) return <p>Loading...</p>;
  if (transactionLogsQuery.isError) return <p>Error loading logs.</p>;

  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transaction Logs</h1>

      <table className="w-full border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Statement</th>
            <th className="p-2 border">Notes</th>
            <th className="p-2 border">Debit Account Type</th>
            <th className="p-2 border">Debit Account ID</th>
            <th className="p-2 border">Debit Currency</th>
            <th className="p-2 border">Debit Amount</th>
            <th className="p-2 border">Credit Account Type</th>
            <th className="p-2 border">Credit Account ID</th>
            <th className="p-2 border">Credit Currency</th>
            <th className="p-2 border">Credit Amount</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionLogsQuery.data?.map((log) => (
            <tr key={log.id} className="border-t hover:bg-gray-50">
              <td className="p-2 border">{log.id}</td>
              <td className="p-2 border">{log.statement}</td>
              <td className="p-2 border">{log.notes}</td>
              <td className="p-2 border">{log.debits?.[0]?.to_account_type}</td>
              <td className="p-2 border">{log.debits?.[0]?.to_account_id}</td>
              <td className="p-2 border">{log.debits?.[0]?.debit_currency_code}</td>
              <td className="p-2 border">{log.debits?.[0]?.debit_amount}</td>
              <td className="p-2 border">{log.splits?.[0]?.account_type}</td>
              <td className="p-2 border">{log.splits?.[0]?.account_id}</td>
              <td className="p-2 border">{log.splits?.[0]?.credit_currency_code}</td>
              <td className="p-2 border">{log.splits?.[0]?.credit_amount}</td>
              <td className="p-2 border space-x-2">
        
                <button
                  onClick={() => setEditingLog(log)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>

            
                <button
                  onClick={() => deleteTransactionLog.mutate(log.id!)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>

              
                <button
                  onClick={() => confirmTransactionLog.mutate(log.id!)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
