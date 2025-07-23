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
  stock_list: { stock_first_price: number; stock_second_price: number };
}

export interface ReportsResponse {
  reports: Report[];
  total: number;
  skip: number;
  limit: number;
}
