import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { ExpenseInputComponent } from './expense/components/expense-input/expense-input.component';
import { AmountIncomeComponent, IncomeInputComponent, IncomeInputFormComponent } from './income';

@NgModule({
  declarations: [ExpenseInputComponent, AmountIncomeComponent, IncomeInputComponent, IncomeInputFormComponent],
  imports: [CommonModule, OperationsRoutingModule],
})
export class OperationsModule {}
