import { API_URL } from '@/shared/lib/globals';
import { ApiResponse } from '@/shared/model/ApiResponse';
import axios from 'axios';
import { AxiosResponse } from "axios";

export class AuthService {
  static async signIn(phone: string): Promise<AxiosResponse<ApiResponse<{message: string}>>> {
    return axios.post<string, AxiosResponse<ApiResponse<{message: string}>>>(API_URL + "/customers/auth", { phone });
  }

  static async signUp(phone: string, username: string): Promise<AxiosResponse<ApiResponse<{message: string}>>> {
    return axios.post<string, AxiosResponse<ApiResponse<{message: string}>>>(API_URL + "/customers/auth", { phone, username });
  }

  static async confirmCode(phone: string, code: string): Promise<AxiosResponse<ApiResponse<{token: string}>>> {
    return axios.post<string, AxiosResponse<ApiResponse<{token: string}>>>(API_URL + "/customers/confirm", { code, phone });
  }
}