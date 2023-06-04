import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimOnChangeDirective } from './directives';
import { LoaderComponent } from './components/loader/loader.component';

import { MaterialModule } from './modules';
import { AppNavigationComponent } from './components';

@NgModule({
  declarations: [TrimOnChangeDirective, LoaderComponent, AppNavigationComponent],
  exports: [TrimOnChangeDirective, LoaderComponent, AppNavigationComponent],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
