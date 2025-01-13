import { AxiosResponse } from "axios";
import { CurrencyModel } from "../model/CurrencyModel";
import { $api } from "@/shared/api";
import { ApiItemsResponse } from "@/shared/model/ApiItemsResponse";

export class CurrencyService {
  static async getCurrencyList(): Promise<AxiosResponse<ApiItemsResponse<CurrencyModel>>> {
    const search = "";
    const offset = 0;
    const limit = 100;
    return $api.get<ApiItemsResponse<CurrencyModel>>("/management/currencies", { params: { search, offset, limit }});
  }
}