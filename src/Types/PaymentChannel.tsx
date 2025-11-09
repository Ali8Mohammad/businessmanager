export interface PaymentChannel {
  id: number;
  channel_name: string;
  channel_type: string;
  default_currency_code: string;
  is_active: boolean;
}
