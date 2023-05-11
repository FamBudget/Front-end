import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CaptchaService } from '../../services';
import { ReCaptchaV3Service, RecaptchaErrorParameters } from 'ng-recaptcha';
import { ERROR_MESSAGES } from 'src/app/enums';
import { RECAPTCHA_SITE_KEY } from 'src/app/constants';
import { MatDialog } from '@angular/material/dialog';
import { PasswordRecoveryFirstDialogComponent } from '..';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
  providers: [ReCaptchaV3Service, CaptchaService],
})
export class ForgotPasswordFormComponent {
  public forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    recaptcha: new FormControl(''),
  });
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
  protected readonly RECAPTCHA_SITE_KEY = RECAPTCHA_SITE_KEY;

  constructor(private fb: FormBuilder, private recaptchaService: CaptchaService, private dialog: MatDialog) {}

  public get f() {
    return this.forgotPasswordForm.controls;
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      recaptcha: ['', Validators.required],
    });
  }

  public onRes(resolved: string): void {
    this.recaptchaService.resolved(resolved);
  }

  public onError(errDetail: RecaptchaErrorParameters): void {
    this.recaptchaService.onError(errDetail);
  }

  public onSubmit() {
    if (this.forgotPasswordForm.invalid) return;
    console.log(this.forgotPasswordForm.value);
    this.forgotPasswordForm.disabled;
    this.forgotPasswordForm.reset();
    this.openNextDialog();
  }

  public openNextDialog() {
    this.dialog.closeAll();
    this.dialog.open(PasswordRecoveryFirstDialogComponent, {
      width: '100%',
      maxWidth: '720px',
    });
  }
}
