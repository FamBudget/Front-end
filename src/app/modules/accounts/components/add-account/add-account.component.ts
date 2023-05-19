import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_MESSAGES } from 'src/app/enums';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent implements OnInit {
  public isTileLayout: boolean = true;
  public selectIconNumber: number = 1;
  public addAccountForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    currency: new FormControl(''),
    startAmount: new FormControl(null, Validators.required),
    createdOn: new FormControl(new Date().toISOString().substring(0, 10)),
    iconNumber: new FormControl(this.selectIconNumber),
  });
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;

  constructor(public dialog: MatDialog, public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addAccountForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      currency: new FormControl(''),
      startAmount: new FormControl(null, Validators.required),
      createdOn: new FormControl(new Date().toISOString().substring(0, 10)),
      iconNumber: new FormControl(this.selectIconNumber),
    });
  }

  public get f() {
    return this.addAccountForm.controls;
  }

  public onFormSubmit(): void {
    if (this.addAccountForm.invalid) return;
    this.convertValues();
    console.log(this.addAccountForm.value);
    this.dialog.closeAll();
  }

  public convertValues(): void {
    this.addAccountForm.value['iconNumber'] = this.selectIconNumber;
    this.convertDateValue();
  }

  public convertDateValue(): void {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    this.addAccountForm.value['createdOn'] = `${this.addAccountForm.value['createdOn']} ${time}`;
  }

  public onToggleLayout(event: boolean): void {
    this.isTileLayout = event;
  }

  public onIconChanged(value: number) {
    this.selectIconNumber = value;
  }
}
