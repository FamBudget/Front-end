import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { ERROR_MESSAGES } from 'src/app/enums';
import { MatDialog } from '@angular/material/dialog';
import { PasswordRecoveryFirstDialogComponent } from '..';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
})
export class ForgotPasswordFormComponent implements OnInit, OnDestroy {
  public forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    recaptcha: new FormControl(''),
  });
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
  private resetPasswordSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: SnackBarService,
  ) {}

  public get f() {
    return this.forgotPasswordForm.controls;
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      recaptcha: [null, [Validators.required, Validators.nullValidator]],
    });
  }

  ngOnDestroy(): void {
    this.resetPasswordSubscription.unsubscribe();
  }

  public onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;
    this.resetPassword();
  }

  public resetPassword(): void {
    const email: string = this.forgotPasswordForm.value.email;

    this.resetPasswordSubscription = this.authService.resetPassword(email).subscribe(
      () => {
        this.openNextDialog();
      },
      (err) => {
        if (err.status === 404) {
          this.snackBar.showSnackBar(ERROR_MESSAGES.NOT_EXIST_USER);
        } else {
          this.snackBar.showSnackBar('Ошибка при сбросе пароля.');
        }
      },
      () => {
        this.forgotPasswordForm.reset();
        this.forgotPasswordForm.markAsUntouched();
      },
    );
  }

  public openNextDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(PasswordRecoveryFirstDialogComponent, {
      panelClass: 'password-recovery-dialog',
    });
  }

  public onChangeRecaptcha(checked: boolean): void {
    if (!checked) {
      this.forgotPasswordForm.get('recaptcha')?.setValue(null);
    } else {
      this.forgotPasswordForm.get('recaptcha')?.setValue(true);
    }
  }
}
