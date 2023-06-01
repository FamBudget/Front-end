import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { ExpenseInputComponent } from './expense/components/expense-input/expense-input.component';


@NgModule({
  declarations: [
    ExpenseInputComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule
  ]
})
export class OperationsModule { }
