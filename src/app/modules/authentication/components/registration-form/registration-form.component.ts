import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService, CaptchaService } from '../../services';
import { SnackBarService } from '../../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Currencies } from '../../models';
import { currencies, passwordPattern, passwordsMatchValidator, RECAPTCHA_SITE_KEY } from '../../../../constants';
import { ERROR_MESSAGES } from '../../../../enums';
import { RecaptchaErrorParameters, ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  providers: [AuthenticationService, ReCaptchaV3Service, CaptchaService],
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

  public currencies: Currencies[] = currencies;

  private signUpSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: SnackBarService,
    private recaptchaService: CaptchaService,
    private router: Router,
    private route: ActivatedRoute,
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
      { validators: passwordsMatchValidator },
    );
  }

  ngOnDestroy(): void {
    this.signUpSubscription.unsubscribe();
  }

  public onRes(resolved: string): void {
    this.recaptchaService.resolved(resolved);
  }

  public onError(errDetail: RecaptchaErrorParameters): void {
    this.recaptchaService.onError(errDetail);
  }

  public onSelectCurrency(curr: Currencies): void {
    this.signUpForm.get('currency')?.setValue(curr.currency);
  }

  public onSubmit(): void {
    if (this.signUpForm.invalid) return;

    this.signUpForm.disabled;
    this.signUpSubscription = this.authService.signUp(this.signUpForm.value).subscribe(
      () => {},
      (err) => {
        if (err.status === 409) {
          this.snackBar.showSnackBar(ERROR_MESSAGES.FOUNDED_USER);
          this.signUpForm.enabled;
        } else {
          this.snackBar.showSnackBar('Ошибка при регистрации.');
          this.signUpForm.enabled;
        }
      },
    );

    this.signUpForm.reset();
  }
}
