import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAccountComponent } from '../add-account';
import { AccountsService } from '../../services/accounts.service';
import { SnackBarService } from 'src/app/shared/services';
import { Account, AccountIcon, RequestGetAccounts } from '../../models';
import { ACCOUNT_ICONS_DATA } from './data';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  public params: RequestGetAccounts = {
    email: 'mariaiscus1@gmail.com',
    from: 0,
    size: 10,
  };

  public accountsData: Array<Account> = [];
  public displayedColumns: string[] = ['iconNumber', 'name', 'amount'];
  public iconsData: Array<AccountIcon> = ACCOUNT_ICONS_DATA;

  constructor(public dialog: MatDialog, public accountService: AccountsService, private snackBar: SnackBarService) {}

  ngOnInit(): void {
    this.getAllAccounts();
  }

  public openAccountDialog(): void {
    let addDialogRef = this.dialog.open(AddAccountComponent, {
      width: '100%',
      maxWidth: '720px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      panelClass: 'add-account-dialog-item',
      data: {
        currency: this.accountsData[0].currency,
      },
    });

    addDialogRef.afterClosed().subscribe((result) => {
      this.getAllAccounts();
    });
  }

  public getAllAccounts(): void {
    this.accountService.getAccounts(this.params).subscribe(
      (arrAccounts: Array<Account>) => {
        this.accountsData = arrAccounts;
      },
      () => {
        this.snackBar.showSnackBar('Ошибка при получении счётов.');
      },
    );
  }

  public getAccount(id: number): void {
    const email: string = 'mariaiscus1@gmail.com';
    this.accountService.getAccountById(id, email).subscribe(
      (account: Account) => {
        console.log('account', account);
      },
      () => {
        this.snackBar.showSnackBar('Ошибка при получении счёта.');
      },
    );
  }

  public getIconSrc(iconNumber: number): string {
    let src = this.iconsData.filter((data) => data.id === iconNumber)[0].path;
    return src;
  }
}
