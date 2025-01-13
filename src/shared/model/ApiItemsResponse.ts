export interface ApiItemsResponse<T> {
  data: {
    items: T[];
  };
  meta: any;
  errors: any;
}