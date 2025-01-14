import { ApiItemsResponse } from "@/shared/model/ApiItemsResponse";
import { OperationModel } from "../model/OperationModel";
import { AxiosResponse } from "axios";
import { $api } from "@/shared/api";
import { BudgetModel } from "@/entities/budget/model/BudgetModel";

export class OperationService {
  static async getOperationList(): Promise<AxiosResponse<ApiItemsResponse<OperationModel>>> {
    const search = "";
    const offset = 0;
    const limit = 1000;
    return $api.get<ApiItemsResponse<OperationModel>>("/management/operations", { params: { search, offset, limit }});
  }

  static async getOperationsForBudget(budgetId: number): Promise<AxiosResponse<ApiItemsResponse<{ related_budget: BudgetModel, related_operations: OperationModel[]}>>> {
    const search = "";
    const offset = 0;
    const limit = 1000;
    return $api.get<ApiItemsResponse<{ related_budget: BudgetModel, related_operations: OperationModel[]}>>(`/management/budgets/${budgetId}/operations`, { params: { search, offset, limit }});
  }

  static async createOperation(title: string, operationType: string, amount: number, relatedCategoryId: number | null, relatedBudgetId: number): Promise<AxiosResponse<OperationModel>> {
    const args: any = { title, operation_type: operationType, amount, related_budget_id: relatedBudgetId };
    if (relatedCategoryId) args.related_category_id = relatedCategoryId;
    return $api.post<OperationModel>("/management/operations", args);
  }

  static async updateOperation(operationId: number, title: string, operationType: string, amount: number, relatedCategoryId: number | null): Promise<AxiosResponse<OperationModel>> {
    const args: any = { title, operation_type: operationType, amount, related_category_id: relatedCategoryId };
    if (relatedCategoryId === null) delete args.related_category_id;
    return $api.put<OperationModel>(`/management/operations/${operationId}`, args);
  }

  static async deleteOperation(operationId: number): Promise<AxiosResponse<void>> {
    return $api.delete<void>(`/management/operations/${operationId}`);
  }
}
