export interface Product {
  sp_id: number;
  stock_id: number;
  stock_name: string;
  stock_phone_imei: string | null;
  stock_first_price: number | null;
  stock_second_price: number | null;
  stock_count: number | null;
  stock_visible: boolean;
  stock_get_fdate: string | null;
  stock_get_year: number | null;
  stock_return_status: string | null;
  stock_type: string | null;
  barcode_article: string | null;
  product_added: string | null;
  product_provider: string | null;
  product_category: string | null;
  min_quantity_stock: number | null;
  last_edited_date: string | null;
  sync_status: string | null;
  sync_updated_at: string | null;
  category_data: { stock_category: { category_name: string } }[];
}
