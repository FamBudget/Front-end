import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/authentication/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then((auth) => auth.AuthenticationModule),
  },
  {
    path: 'operations',
    loadChildren: () =>
      import('./modules/operations/operations.module').then((operations) => operations.OperationsModule),
    canActivate: [AuthGuard],
    data: { title: 'Операции' },
  },
  {
    path: 'accounts',
    loadChildren: () => import('./modules/accounts/accounts.module').then((accounts) => accounts.AccountsModule),
    canActivate: [AuthGuard],
    data: { title: 'Счета' },
  },
  {
    path: 'budget',
    loadChildren: () => import('./modules/budget/budget.module').then((budget) => budget.BudgetModule),
    canActivate: [AuthGuard],
    data: { title: 'Бюджет' },
  },
  {
    path: 'income',
    loadChildren: () => import('./modules/income/income.module').then((income) => income.IncomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'expense',
    loadChildren: () => import('./modules/expense/expense.module').then((expense) => expense.ExpenseModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    loadChildren: () => import('./modules/reports/reports.module').then((reports) => reports.ReportsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then((settings) => settings.SettingsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
