import { ApiResponse } from "@/shared/model/ApiResponse";
import { AxiosResponse } from "axios";
import { CurrencyModel } from "../model/CurrencyModel";
import { $api } from "@/shared/api";

export class CurrencyService {
  static async getCurrencyList(): Promise<AxiosResponse<ApiResponse<CurrencyModel[]>>> {
    const search = "";
    const offset = 0;
    const limit = 100;
    return $api.get<ApiResponse<CurrencyModel[]>>("/management/currencies", { params: { search, offset, limit }});
  }
}