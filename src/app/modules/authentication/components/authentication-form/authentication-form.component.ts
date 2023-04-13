import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SnackBarService } from '../../../../shared/services';
import { Subscription } from 'rxjs';

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

  private authSub: Subscription = new Subscription();

  constructor(
    private fd: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: SnackBarService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fd.group({
      email: [],
      password: [],
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['']) {
      } else if (params['']) {
      } else if (params['']) {
      }
    });
  }

  public onSubmit() {
    if (this.signInForm.invalid) return;

    this.authSub = this.authService.signIn().subscribe(
      () => {
        this.router.navigate(['']);
      },
      (error) => {
        this.snackBar.showSnackBar(error.error.message);
        this.signInForm.enabled;
      },
    );

    this.signInForm.reset();
  }
}
