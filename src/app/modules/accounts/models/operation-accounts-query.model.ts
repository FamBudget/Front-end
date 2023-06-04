export interface OperationAccountsQuery {
  email: string;
  endDate?: string;
  from?: number;
  size?: number;
  sort?: string;
  sortDesc?: boolean;
  startDate?: string;
}
