import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseInputComponent } from './expense';
import { IncomeInputComponent } from './income';
import { AuthGuard } from '../authentication/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'expense',
    component: ExpenseInputComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'income',
    component: IncomeInputComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {}
