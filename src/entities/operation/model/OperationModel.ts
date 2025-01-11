import { BudgetModel } from "@/entities/budget/model/BudgetModel";
import { CategoryModel } from "@/entities/category/model/CategoryModel";

export interface OperationModel {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  operation_type: string;
  amount: number;
  related_budget: BudgetModel;
  related_category: CategoryModel;
}