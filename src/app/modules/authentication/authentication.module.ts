import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthenticationPageComponent } from './components/authentication-page/authentication-page.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MaterialModule } from '../../shared/modules';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';

@NgModule({
  declarations: [AuthenticationPageComponent, AuthenticationFormComponent],
  imports: [CommonModule, AuthenticationRoutingModule, MaterialModule, NgOptimizedImage],
})
export class AuthenticationModule {}
