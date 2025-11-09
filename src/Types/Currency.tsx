export interface Currency {
  id: number;
  currency_code: string;
  currency_name: string;
  symbol: string;
  exchange_rate_to_usd: number;
  created_at?: string;
  updated_at?: string;
}
