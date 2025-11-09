export interface TransactionLog {
  id?: number;
  statement: string;
  notes?: string;
  debits: {
    to_account_type: string;
    to_account_id: number | string;
    debit_currency_code: string;
    debit_amount: number | string;
    exchange_rate?: number | string;
  }[];
  splits: {
    account_type: string;
    account_id: number | string;
    credit_currency_code: string;
    credit_amount: number | string;
    memo?: string;
    exchange_rate?: number | string;
  }[];
}
