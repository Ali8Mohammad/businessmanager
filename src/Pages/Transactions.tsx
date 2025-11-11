import { useCurrencies } from "../Hooks/useCurrencies";
import { usePartners } from "../Hooks/UsePartners";
import { usePaymentChannels } from "../Hooks/UsePaymentChannel";
import { useTransactionLogs } from "../Hooks/useTransactionLogs";

import TransactionForm from "../Features/TransactionLog/TransactionForm";
import TransactionTable from "../Features/TransactionLog/TransactionTable";

export default function Transactions() {
  const { currenciesQuery } = useCurrencies();
  const { partnersQuery } = usePartners();
  const { channelsQuery } = usePaymentChannels();
  const { transactionLogsQuery, addTransactionLog, deleteTransactionLog, confirmTransactionLog } =
    useTransactionLogs();

  if (
    currenciesQuery.isLoading ||
    partnersQuery.isLoading ||
    channelsQuery.isLoading ||
    transactionLogsQuery.isLoading
  )
    return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <TransactionForm
        onSubmit={(data) => addTransactionLog.mutate(data)}
        currencies={currenciesQuery.data || []}
        partners={partnersQuery.data || []}
        channels={channelsQuery.data || []}
      />

      <TransactionTable
        data={transactionLogsQuery.data || []}
        onDelete={(id) => deleteTransactionLog.mutate(id)}
        onConfirm={(id) => confirmTransactionLog.mutate(id)}
      />
    </div>
  );
}
