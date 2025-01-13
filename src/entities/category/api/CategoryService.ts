import { CategoryModel } from "../model/CategoryModel";
import { $api } from "@/shared/api";
import { AxiosResponse } from "axios";
import { ApiItemsResponse } from "@/shared/model/ApiItemsResponse";

export class CategoryService {
  static async getCategoryList(): Promise<AxiosResponse<ApiItemsResponse<CategoryModel>>> {
    const search = "";
    const offset = 0;
    const limit = 100;
    return $api.get<ApiItemsResponse<CategoryModel>>("/management/categories", { params: { search, offset, limit }});
  }

  static async createCategory(name: string): Promise<AxiosResponse<CategoryModel>> {
    return $api.post<CategoryModel>("/management/categories", { name });
  }
}