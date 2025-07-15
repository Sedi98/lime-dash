export interface Report {
  sp_id: number;
  order_stock_id: number;
  stock_id: number;
  order_stock_name: string;
  order_stock_imei: string | null;
  order_stock_count: number;
  order_stock_sprice: number;
  order_stock_total_price: number;
  order_total_profit: number;
  order_date: string; // dd.mm.yyyy format
  order_who_buy: string;
  order_my_date: string; // mm.yyyy format
  stock_order_visible: number;
  order_seller_name: string;
  payment_method: number;
  sales_man: number;
  transaction_id: string | null | number;
  has_editable: number;
  max_refaund_quantity: number;
  user_control: { user_name: string };
  payment_method_list: { title: string };
}

export interface ReportsResponse {
  reports: Report[];
  total: number;
  skip: number;
  limit: number;
  available_dates: string[]; // Array of dd.mm.yyyy strings
  available_months: string[]; // Array of mm.yyyy strings
}
