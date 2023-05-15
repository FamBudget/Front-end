import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService, CaptchaService } from '../../services';
import { SnackBarService } from '../../../../shared/services';
import { Currencies } from '../../models';
import { currencies, passwordPattern, passwordsMatchValidator, RECAPTCHA_SITE_KEY } from '../../../../constants';
import { ERROR_MESSAGES } from '../../../../enums';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  providers: [AuthenticationService, ReCaptchaV3Service, CaptchaService],
})
export class RegistrationFormComponent implements OnDestroy {
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;

  protected readonly RECAPTCHA_SITE_KEY = RECAPTCHA_SITE_KEY;

  public signUpForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      currency: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      recaptcha: ['', Validators.required],
    },
    { validators: passwordsMatchValidator },
  );

  public showPassword = false;

  public showAdditionalPassword = false;

  public currencies = currencies;

  private signUpSubscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private snackBar: SnackBarService) {}

  ngOnDestroy() {
    this.signUpSubscription.unsubscribe();
  }

  public onSelectCurrency(curr: Currencies) {
    this.signUpForm.get('currency')?.setValue(curr.currency);
  }

  public onSubmit() {
    if (this.signUpForm.invalid) return;

    const formValues = { ...this.signUpForm.value };

    delete formValues.recaptcha;

    this.signUpForm.disable();

    this.signUpSubscription = this.authService.signUp(formValues).subscribe(
      () => {},
      (err) => {
        if (err.status === 409) {
          this.snackBar.showSnackBar(ERROR_MESSAGES.FOUNDED_USER);
        } else {
          this.snackBar.showSnackBar('Ошибка при регистрации.');
        }
      },
      () => this.signUpForm.reset(),
    );
  }

  public get f() {
    return this.signUpForm.controls;
  }
}
