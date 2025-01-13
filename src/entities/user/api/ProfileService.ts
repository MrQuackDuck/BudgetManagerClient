import { $api } from "@/shared/api";
import { UserModel } from "../model/UserModel";
import { ApiResponse } from "@/shared/model/ApiResponse";
import { AxiosResponse } from "axios";

export class ProfileService {
  static async getProfile(): Promise<AxiosResponse<ApiResponse<{item: UserModel}>>> {
    return $api.get<ApiResponse<{item: UserModel}>>("/customers/profile");
  }

  static async updateProfile(username: string): Promise<AxiosResponse<ApiResponse<{item: UserModel}>>> {
    return $api.put<ApiResponse<{item: UserModel}>>("/customers/profile", { username });
  }
}