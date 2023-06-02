import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimOnChangeDirective } from './directives';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [TrimOnChangeDirective, LoaderComponent],
  exports: [TrimOnChangeDirective, LoaderComponent],
  imports: [CommonModule],
})
export class SharedModule {}
