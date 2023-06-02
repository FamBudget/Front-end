import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseInputComponent } from './expense';
import { IncomeInputComponent } from './income';
import { AuthGuard } from '../authentication/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'expense',
    canActivateChild: [AuthGuard],
    component: ExpenseInputComponent,
  },
  {
    path: 'income',
    canActivateChild: [AuthGuard],
    component: IncomeInputComponent,
  },
  {
    path: '',
    redirectTo: 'expense',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {}
