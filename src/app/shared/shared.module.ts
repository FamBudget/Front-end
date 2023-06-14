import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimOnChangeDirective } from './directives';

import { MaterialModule } from './modules';
import { LoaderComponent, LogoutComponent, LogoutDialogComponent } from './components';
@NgModule({
  declarations: [TrimOnChangeDirective, LoaderComponent, LogoutComponent, LogoutDialogComponent],
  exports: [TrimOnChangeDirective, LoaderComponent, LogoutComponent, LogoutDialogComponent],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
