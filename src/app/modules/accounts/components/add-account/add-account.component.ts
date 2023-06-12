import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { currencies } from 'src/app/constants';
import { ERROR_MESSAGES } from 'src/app/enums';
import { AccountsService } from '../../services/accounts.service';
import { Account } from '../../models';
import { LocalStorageService, SnackBarService } from 'src/app/shared/services';
import { EmptyStringValidator, FutureDateValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent implements OnInit {
  @ViewChild('currencySpan') currencySpan!: ElementRef;
  public isTileLayout: boolean = true;
  public selectIconNumber: number = 0;
  public addAccountForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    currency: new FormControl(''),
    startAmount: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
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
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.addAccountForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required,
        EmptyStringValidator,
        Validators.pattern('^[^W_]+( [^W_]+)*$'),
      ]),
      currency: new FormControl(this.getCurrencyName(this.inputData.currency)),
      startAmount: new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
      createdOn: new FormControl(new Date().toISOString().substring(0, 10), FutureDateValidator),
      iconNumber: new FormControl(this.selectIconNumber),
    });
  }

  ngAfterViewInit() {
    this.currencySpan.nativeElement.textContent = this.data.currency;
    console.log(this.currencySpan.nativeElement.textContent);
  }

  public get f() {
    return this.addAccountForm.controls;
  }

  public convertValues(): void {
    this.addAccountForm.value['iconNumber'] = this.selectIconNumber;
    this.addAccountForm.value['startAmount'] = parseInt(this.addAccountForm.value['startAmount']);
    this.convertDateValue();
  }

  public getCurrencyName(currencyCode: string): string {
    switch (currencyCode) {
      case 'RUB':
        return `${currencyCode} ("Российский рубль")`;
      case 'BYN':
        return `${currencyCode} ("Белорусский рубль")`;
      case 'KZT':
        return `${currencyCode} ("Казахстанский тенге")`;
      case 'USD':
        return `${currencyCode} ("Доллар США")`;
      case 'EUR':
        return `${currencyCode} ("Евро")`;
      default:
        return '';
    }
  }

  public convertDateValue(): void {
    const now = new Date();
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds = now.getUTCSeconds().toString().padStart(2, '0');
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
    const email: string = this.localStorageService.getItem('email') as string;
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
