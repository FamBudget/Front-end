import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseInputComponent } from './expense';
import { IncomeInputComponent } from './income';

const routes: Routes = [
  {
    path: 'expense',
    component: ExpenseInputComponent,
  },
  {
    path: 'income',
    component: IncomeInputComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {}
