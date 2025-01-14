import { BudgetModel } from "@/entities/budget/model/BudgetModel";
import { CategoryModel } from "@/entities/category/model/CategoryModel";
import { OperationType } from "./OperationType";

export interface OperationModel {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  operation_type: OperationType;
  amount: number;
  related_budget: BudgetModel;
  related_category: CategoryModel;
}