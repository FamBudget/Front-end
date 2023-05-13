import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, CaptchaService } from '../../services';
import { ReCaptchaV3Service, RecaptchaErrorParameters } from 'ng-recaptcha';
import { ERROR_MESSAGES } from 'src/app/enums';
import { RECAPTCHA_SITE_KEY } from 'src/app/constants';
import { MatDialog } from '@angular/material/dialog';
import { PasswordRecoveryFirstDialogComponent } from '..';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
  providers: [AuthenticationService, ReCaptchaV3Service, CaptchaService],
})
export class ForgotPasswordFormComponent implements OnInit {
  public forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    recaptcha: new FormControl(''),
  });
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
  protected readonly RECAPTCHA_SITE_KEY = RECAPTCHA_SITE_KEY;
  private resetPasswordSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private recaptchaService: CaptchaService,
    private dialog: MatDialog,
    private snackBar: SnackBarService,
  ) {}

  public get f() {
    return this.forgotPasswordForm.controls;
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      recaptcha: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.resetPasswordSubscription.unsubscribe();
  }

  public onRes(resolved: string): void {
    this.recaptchaService.resolved(resolved);
  }

  public onError(errDetail: RecaptchaErrorParameters): void {
    this.recaptchaService.onError(errDetail);
  }

  public onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;
    console.log(this.forgotPasswordForm.value.email);
    this.forgotPasswordForm.disabled;

    this.resetPasswordSubscription = this.authService.resetPassword(this.forgotPasswordForm.value.email).subscribe(
      (value) => {
        console.log(value);
        this.openNextDialog();
      },
      (err) => {
        if (err.status === 404) {
          this.snackBar.showSnackBar(ERROR_MESSAGES.NOT_EXIST_USER);
          this.forgotPasswordForm.enabled;
        } else {
          this.snackBar.showSnackBar('Ошибка при сбросе пароля.');
          this.forgotPasswordForm.enabled;
        }
      },
    );

    this.forgotPasswordForm.reset();
  }

  public openNextDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(PasswordRecoveryFirstDialogComponent, {
      width: '100%',
      maxWidth: '720px',
    });
  }
}
