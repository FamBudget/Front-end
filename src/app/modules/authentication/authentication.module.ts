import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AuthenticationDialogComponent,
  AuthenticationFormComponent,
  AuthenticationPageComponent,
  ForgotPasswordDialogComponent,
  PasswordRecoveredDialogComponent,
  PasswordRecoveryFirstDialogComponent,
  PasswordRecoverySecondDialogComponent,
  RegistrationFormComponent,
  ForgotPasswordFormComponent,
  PasswordRecoveryFormComponent
} from './components';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MaterialModule } from '../../shared/modules';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_SITE_KEY } from '../../constants';

@NgModule({
  declarations: [
    AuthenticationPageComponent,
    AuthenticationFormComponent,
    AuthenticationDialogComponent,
    RegistrationFormComponent,
    ForgotPasswordDialogComponent,
    PasswordRecoveryFirstDialogComponent,
    PasswordRecoverySecondDialogComponent,
    PasswordRecoveredDialogComponent,
    ForgotPasswordFormComponent,
    PasswordRecoveryFormComponent,
  ],
  imports: [
    CommonModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    AuthenticationRoutingModule,
    MaterialModule,
    NgOptimizedImage,
  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: RECAPTCHA_SITE_KEY }],
})
export class AuthenticationModule {}
