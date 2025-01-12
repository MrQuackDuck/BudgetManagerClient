export interface ApiResponse<T> {
  data: T;
  meta: any;
  errors: any;
}