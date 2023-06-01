import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimOnChangeDirective } from './directives';

@NgModule({
  declarations: [TrimOnChangeDirective],
  exports: [TrimOnChangeDirective],
  imports: [CommonModule],
})
export class SharedModule {}
