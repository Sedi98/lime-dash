export interface SalesStatsResponse {
  months: string[];   // Array of "mm.yyyy" month strings
  totals: number[];   // Array of total earnings for each corresponding month
}