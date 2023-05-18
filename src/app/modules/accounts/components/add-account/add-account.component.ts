import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_MESSAGES } from 'src/app/enums';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent {
  public isTileLayout: boolean = true;
  public addAccountForm: FormGroup = new FormGroup({});
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.addAccountForm = this.formBuilder.group({});
  }

  public get f() {
    return this.addAccountForm.controls;
  }

  public onFormSubmit(): void {
    if (this.addAccountForm.invalid) return;
    this.dialog.closeAll();
  }

  public onToggleLayout(event: boolean): void {
    this.isTileLayout = event;
  }
}
