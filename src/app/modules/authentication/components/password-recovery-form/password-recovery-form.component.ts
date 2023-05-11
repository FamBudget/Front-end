import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_MESSAGES } from 'src/app/enums';
import { PasswordRecoveredDialogComponent } from '..';
import { passwordPattern, passwordsMatchValidator } from '../../../../constants';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.scss'],
})
export class PasswordRecoveryFormComponent implements OnInit {
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;

  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  public passwordRecoveryForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  public get f() {
    return this.passwordRecoveryForm.controls;
  }

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.passwordRecoveryForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      },
      { validators: passwordsMatchValidator },
    );
  }

  public onSubmit(): void {
    if (this.passwordRecoveryForm.invalid) return;
    console.log(this.passwordRecoveryForm.value);
    this.passwordRecoveryForm.disabled;
    this.passwordRecoveryForm.reset();
    this.openNextDialog();
  }

  public openNextDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(PasswordRecoveredDialogComponent, {
      width: '100%',
      maxWidth: '720px',
    });
  }
}
