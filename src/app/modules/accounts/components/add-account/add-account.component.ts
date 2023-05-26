import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { currencies } from 'src/app/constants';
import { ERROR_MESSAGES } from 'src/app/enums';
import { AccountsService } from '../../services/accounts.service';
import { Account } from '../../models';
import { SnackBarService } from 'src/app/shared/services';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent implements OnInit {
  public isTileLayout: boolean = true;
  public selectIconNumber: number = 0;
  public addAccountForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    currency: new FormControl(''),
    startAmount: new FormControl(null, Validators.required),
    createdOn: new FormControl(new Date().toISOString().substring(0, 10)),
    iconNumber: new FormControl(this.selectIconNumber),
  });
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
  public inputData: { currency: string } = { currency: '' };
  public currencies = currencies;
  public newAccount: Account = {
    amount: 0,
    createdOn: '',
    currency: '',
    iconNumber: 0,
    name: '',
    startAmount: 0,
  };

  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { currency: string },
    private accountsService: AccountsService,
    private snackBar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.addAccountForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      currency: new FormControl(`${this.inputData.currency}`),
      startAmount: new FormControl(null, Validators.required),
      createdOn: new FormControl(new Date().toISOString().substring(0, 10)),
      iconNumber: new FormControl(this.selectIconNumber),
    });
  }

  public get f() {
    return this.addAccountForm.controls;
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

  public onAddAcount(): void {
    if (this.addAccountForm.invalid) return;
    this.convertValues();

    console.log('this.addAccountForm.value', this.addAccountForm.value);
    const email: string = 'mariaiscus1@gmail.com';
    this.accountsService.addAccount(email, this.addAccountForm.value).subscribe(
      (account: Account) => {
        this.newAccount = account;
        console.log('this.newAccount', this.newAccount);
        this.dialog.closeAll();
      },
      (error) => {
        console.log(error);
        this.snackBar.showSnackBar('Ошибка при добавлении счёта.');
      },
    );
  }
}
