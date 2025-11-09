export interface Partner {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  default_currency?: string;
  notes?: string;
  type: "customer" | "supplier";
}