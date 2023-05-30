import { OperationAccount } from './operation-account.model';

export interface OperationAccounts {
  accountFrom: OperationAccount;
  accountTo: OperationAccount;
  amount: number;
  createdOn: string;
  description: string;
  id: number;
}
