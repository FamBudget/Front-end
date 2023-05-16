import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsPageComponent } from './components/accounts-page/accounts-page.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountsHeaderComponent } from './components/accounts-header/accounts-header.component';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { MaterialModule } from 'src/app/shared/modules';

@NgModule({
  declarations: [AccountsPageComponent, AccountsComponent, AccountsHeaderComponent, AccountsTableComponent],
  imports: [CommonModule, AccountsRoutingModule, MaterialModule],
})
export class AccountsModule {}
