import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services';
import { SnackBarService } from '../../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Currencies } from '../../models';
import { passwordPattern, RECAPTCHA_SITE_KEY } from '../../../../constants';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { CURRENCIES, CURRENCIES_SYMBOLS, ERROR_MESSAGES } from '../../../../enums';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  providers: [AuthenticationService, ReCaptchaV3Service],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;

  protected readonly RECAPTCHA_SITE_KEY = RECAPTCHA_SITE_KEY;

  public signUpForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    currency: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    recaptcha: new FormControl(''),
  });

  public get f() {
    return this.signUpForm.controls;
  }

  public currencies: Currencies[] = [
    {
      symbol: CURRENCIES_SYMBOLS.USD,
      currency: CURRENCIES.USD,
    },
    {
      symbol: CURRENCIES_SYMBOLS.EUR,
      currency: CURRENCIES.EUR,
    },
    {
      symbol: CURRENCIES_SYMBOLS.BYN,
      currency: CURRENCIES.BYN,
    },
    {
      symbol: CURRENCIES_SYMBOLS.RUB,
      currency: CURRENCIES.RUB,
    },
    {
      symbol: CURRENCIES_SYMBOLS.KTZ,
      currency: CURRENCIES.KZT,
    },
  ];

  private signUpSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: SnackBarService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        currency: ['', Validators.required],
        password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
        recaptcha: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator },
    );

    this.reCaptchaV3Service.execute('hello');
  }

  ngOnDestroy(): void {
    this.signUpSubscription.unsubscribe();
  }

  public onSelectCurrency(curr: Currencies): void {
    this.signUpForm.get('currency')?.setValue(curr.currency);
  }

  public onSubmit(): void {
    console.log(this.signUpForm.value);
    if (this.signUpForm.invalid) return;

    this.signUpForm.disabled;
    this.signUpSubscription = this.authService.signUp(this.signUpForm.value).subscribe(
      () => {},
      (err) => {
        if (err.status === 409) {
          this.snackBar.showSnackBar(ERROR_MESSAGES.FOUNDED_USER);
        }

        this.snackBar.showSnackBar(`Ошибка регистрации ${err.message}`);
        this.signUpForm.enabled;
      },
    );

    this.signUpForm.reset();
  }

  private passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ value: 'Пароли не совпадают' });
    }
  }
}
