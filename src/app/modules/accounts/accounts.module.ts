import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsPageComponent } from './components/accounts-page/accounts-page.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountsHeaderComponent } from './components/accounts-header/accounts-header.component';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { MaterialModule } from 'src/app/shared/modules';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { SelectIconToggleComponent } from './components/add-account/select-icon-toggle/select-icon-toggle.component';
import { TokenInterceptor } from 'src/app/shared/interceptors';
import { AuthenticationService } from '../authentication/services';

@NgModule({
  declarations: [
    AccountsPageComponent,
    AccountsComponent,
    AccountsHeaderComponent,
    AccountsTableComponent,
    AddAccountComponent,
    SelectIconToggleComponent,
  ],
  imports: [CommonModule, AccountsRoutingModule, MaterialModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
})
export class AccountsModule {}
