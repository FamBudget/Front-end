import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../services';
import { SnackBarService } from '../../../../shared/services';
import { Subscription } from 'rxjs';
import { sign } from 'chart.js/helpers';
import { passwordPattern } from '../../../../constants';
import { ERROR_MESSAGES } from '../../../../enums';
import { STATUS_CODE } from '../../../../enums/status-code';
import { ForgotPasswordDialogComponent } from '..';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  providers: [AuthenticationService],
})
export class AuthenticationFormComponent implements OnInit {
  public signInForm: FormGroup = new FormGroup<{
    email: AbstractControl<string | null>;
    password: AbstractControl<string | null>;
  }>({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public showPassword: boolean = false;

  private authSub: Subscription = new Subscription();

  constructor(
    private fd: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: SnackBarService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fd.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['']) {
      } else if (params['']) {
      } else if (params['']) {
      }
    });
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  public onSubmit() {
    if (this.signInForm.invalid) return;

    this.signInForm.disabled;

    this.authSub = this.authService.signIn(this.signInForm.value).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (error) => {
        if (error.status === STATUS_CODE.NOT_FOUND) {
          this.snackBar.showSnackBar(ERROR_MESSAGES.NOT_FOUND_USER);
        } else {
          this.snackBar.showSnackBar(ERROR_MESSAGES.SERVER_ERROR);
        }

        this.signInForm.enabled;
      },
    );

    this.signInForm.reset();
  }

  public openForgotPasswordDialog(): void {
    this.dialog.open(ForgotPasswordDialogComponent, {
      width: '100%',
      maxWidth: '720px',
    });
  }

  protected readonly sign = sign;

  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
}
