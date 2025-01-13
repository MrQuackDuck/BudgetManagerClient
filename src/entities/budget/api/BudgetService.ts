import { AxiosResponse } from "axios";
import { BudgetModel } from "../model/BudgetModel";
import { $api } from "@/shared/api";
import { ApiItemsResponse } from "@/shared/model/ApiItemsResponse";

export class BudgetService {
  static async getBudgetList(): Promise<AxiosResponse<ApiItemsResponse<BudgetModel>>> {
    const search = "";
    const offset = 0;
    const limit = 100;
    return $api.get<ApiItemsResponse<BudgetModel>>("/management/budgets", { params: { search, offset, limit }});
  }

  static async createBudget(title: string, initialAmount: number, relatedCurrencyShortName: string) {
    return $api.post("/management/budgets", { title, initial_amount: initialAmount, related_currency_short_name: relatedCurrencyShortName });
  }

  static async updateBudget(budgetId: number, title: string, initialAmount: number) {
    return $api.put(`/management/budgets/${budgetId}`, { title, initial_amount: initialAmount });
  }

  static async deleteBudget(budgetId: number) {
    return $api.delete(`/management/budgets/${budgetId}`);
  }
}