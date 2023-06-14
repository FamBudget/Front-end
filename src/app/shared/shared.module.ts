import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimOnChangeDirective } from './directives';

import { MaterialModule } from './modules';
import { AppNavigationComponent, LoaderComponent, LogoutComponent } from './components';

@NgModule({
  declarations: [TrimOnChangeDirective, LoaderComponent, AppNavigationComponent, LogoutComponent],
  exports: [TrimOnChangeDirective,  LoaderComponent, AppNavigationComponent, LogoutComponent],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
