import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { AmountIncomeComponent, IncomeInputComponent, IncomeInputFormComponent } from './income';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/modules';

@NgModule({
  declarations: [AmountIncomeComponent, IncomeInputComponent, IncomeInputFormComponent],
  imports: [CommonModule, OperationsRoutingModule, HttpClientModule],
})
export class OperationsModule {}
