export interface Expense {
  sp_id: number;
  rasxod_id: number;
  rasxod_day_date: string; // dd.mm.yyyy format
  rasxod_money: number;
  rasxod_description: string;
  rasxod_year_date: string; // mm.yyyy format
  rasxod_visible: boolean;
}

export interface ExpensesResponse {
  expenses: Expense[];
  total: number;
  skip: number;
  limit: number;
  available_dates: string[]; // dd.mm.yyyy format
  available_months: string[]; // mm.yyyy format
}