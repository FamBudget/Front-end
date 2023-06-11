import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { MaterialModule } from 'src/app/shared/modules';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './components/accounts/data/custom-paginator-intl';
import { SharedModule } from 'src/app/shared';
import {
  AccountsComponent,
  AccountsPageComponent,
  AccountsTableComponent,
  AddAccountComponent,
  ImagePickerComponent,
} from './components';
import { ImageDialogComponent } from './components/add-account/image-dialog/image-dialog.component';
@NgModule({
  declarations: [
    AccountsPageComponent,
    AccountsComponent,
    AccountsTableComponent,
    AddAccountComponent,
    ImagePickerComponent,
    ImageDialogComponent,
  ],
  imports: [CommonModule, AccountsRoutingModule, MaterialModule, SharedModule],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class AccountsModule {}
