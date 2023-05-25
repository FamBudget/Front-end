import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { AmountIncomeComponent, IncomeInputComponent, IncomeInputFormComponent } from './components';

@NgModule({
  declarations: [IncomeInputComponent, IncomeInputFormComponent, AmountIncomeComponent],
  imports: [CommonModule, IncomeRoutingModule],
})
export class IncomeModule {}
