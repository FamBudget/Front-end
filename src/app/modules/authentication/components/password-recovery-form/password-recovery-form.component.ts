import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_MESSAGES } from 'src/app/enums';
import { PasswordRecoveredDialogComponent } from '..';
import { passwordPattern, passwordsMatchValidator } from '../../../../constants';
import { AuthenticationService } from '../../services';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services';
import { User } from '../../models';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.scss'],
  providers: [AuthenticationService],
})
export class PasswordRecoveryFormComponent implements OnInit {
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;

  private changePasswordSubscription: Subscription = new Subscription();

  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  public passwordRecoveryForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  public get f() {
    return this.passwordRecoveryForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.passwordRecoveryForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      },
      { validators: passwordsMatchValidator },
    );
  }

  ngOnDestroy(): void {
    this.changePasswordSubscription.unsubscribe();
  }

  public onSubmit(): void {
    if (this.passwordRecoveryForm.invalid) return;
    console.log(this.passwordRecoveryForm.value);
    this.passwordRecoveryForm.disabled;

    const user: Pick<User, 'confirmPassword' | 'password'> = {
      confirmPassword: this.passwordRecoveryForm.value.confirmPassword,
      password: this.passwordRecoveryForm.value.password,
    };
    const code: string = '';
    const email: string = '';

    this.changePasswordSubscription = this.authService.changePassword(code, email, user).subscribe(
      () => {
        this.openNextDialog();
      },
      (err) => {
        this.snackBar.showSnackBar('Ошибка при смене пароля.');
        this.passwordRecoveryForm.enabled;
      },
      () => {
        this.passwordRecoveryForm.reset();
        this.passwordRecoveryForm.markAsUntouched();
      },
    );
  }

  public openNextDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(PasswordRecoveredDialogComponent, {
      width: '100%',
      maxWidth: '720px',
    });
  }
}
