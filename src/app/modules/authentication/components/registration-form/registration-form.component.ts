import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services';
import { SnackBarService } from '../../../../shared/services';
import { Currencies, User } from '../../models';
import { currencies, passwordPattern, passwordsMatchValidator } from '../../../../constants';
import { ERROR_MESSAGES } from '../../../../enums';
import { MatDialog } from '@angular/material/dialog';
import { EmptyStringValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnDestroy {
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;

  public signUpForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      firstName: [
        '',
        [
          Validators.required,
          EmptyStringValidator,
          Validators.pattern("^[a-zA-Zа-яА-Я]+([-' ][a-zA-Zа-яА-Я]+)*(\\s+[a-zA-Zа-яА-Я]*)*$"),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          EmptyStringValidator,
          Validators.pattern("^[a-zA-Zа-яА-Я]+([-' ][a-zA-Zа-яА-Я]+)*(\\s+[a-zA-Zа-яА-Я]*)*$"),
        ],
      ],
      currency: ['RUB', Validators.required],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      recaptcha: ['', [Validators.required, Validators.nullValidator]],
    },
    { validators: passwordsMatchValidator },
  );

  public showPassword = false;

  public showAdditionalPassword = false;

  public currencies = currencies;

  private signUpSubscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: SnackBarService,
  ) {}

  ngOnDestroy() {
    this.signUpSubscription.unsubscribe();
  }

  public onSelectCurrency(curr: Currencies) {
    this.signUpForm.get('currency')?.setValue(curr.currency);
  }

  public onSubmit() {
    if (this.signUpForm.invalid) return;

    const user: User = {
      confirmPassword: this.signUpForm.value['confirmPassword'].trim(),
      currency: this.signUpForm.value['currency'].trim(),
      email: this.signUpForm.value['email'].trim(),
      firstName: this.signUpForm.value['firstName'].trim(),
      lastName: this.signUpForm.value['lastName'].trim(),
      password: this.signUpForm.value['password'].trim(),
    };

    this.signUpSubscription = this.authService.signUp(user).subscribe(
      () => {
        this.signUpForm.markAsUntouched();
        this.signUpForm.reset();
        this.dialog.closeAll();
      },
      (err) => {
        if (err.status === 409) {
          this.snackBar.showSnackBar(ERROR_MESSAGES.FOUNDED_USER);
        } else {
          this.snackBar.showSnackBar('Ошибка при регистрации.');
        }
      },
    );
  }

  public get f() {
    return this.signUpForm.controls;
  }

  public onChangeRecaptcha(checked: boolean): void {
    if (!checked) {
      this.signUpForm.get('recaptcha')?.setValue(null);
    } else {
      this.signUpForm.get('recaptcha')?.setValue(true);
    }
  }
}
