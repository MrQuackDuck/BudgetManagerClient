import { CurrencyModel } from "@/entities/currency/model/CurrencyModel";

export interface BudgetModel {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  initial_amount: number;
  related_currency: CurrencyModel;
  related_user: string;
}
