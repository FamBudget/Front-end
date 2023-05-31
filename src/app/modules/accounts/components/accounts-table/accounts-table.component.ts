import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { ERROR_MESSAGES } from 'src/app/enums';
import { OperationAccountsQuery } from '../..';
import { AccountsService } from '../../services/accounts.service';
import { SnackBarService } from 'src/app/shared/services';
import { MovingService } from '../../services';
import { OperationAccounts } from '../../models/operation-accounts.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FutureDateValidator } from 'src/app/shared/validators';

export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'long',
    } as Intl.DateTimeFormatOptions,
  },
};

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS }],
})
export class AccountsTableComponent implements OnInit {
  public startDate: Date = new Date(new Date().setDate(new Date().getDate() - 29));
  public endDate: Date = new Date();
  public dateRangeForm: FormGroup = new FormGroup({});

  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;
  public selectedFilter = 'month';
  public displayedColumns: string[] = ['accountFrom', 'accountTo', 'amount', 'createdOn'];
  public dataSource: any;
  public empData: Array<OperationAccounts> = [];
  public params: OperationAccountsQuery = {
    email: 'mariaiscus1@gmail.com',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly adapter: DateAdapter<Date>,
    private formBuilder: FormBuilder,
    public accountService: AccountsService,
    private snackBar: SnackBarService,
    private movingService: MovingService,
  ) {}

  ngOnInit(): void {
    this.startDate = new Date(this.startDate.getTime() - 29 * 24 * 60 * 60 * 1000);
    this.getMovingAccounts();

    this.adapter.setLocale('Ru');
    this.dateRangeForm = new FormGroup({
      start: new FormControl(this.startDate, [Validators.required, FutureDateValidator, Validators.nullValidator]),
      end: new FormControl(this.endDate, [Validators.required, FutureDateValidator, Validators.nullValidator]),
    });
  }

  public get f() {
    return this.dateRangeForm.controls;
  }

  public getMovingAccounts(): void {
    this.movingService.getMoves(this.params).subscribe(
      (res: Array<OperationAccounts>) => {
        this.empData = res;
        this.dataSource = new MatTableDataSource<OperationAccounts>(this.empData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sort.sort({ id: 'createdOn', start: 'desc', disableClear: true });
        if (this.dataSource) {
          this.dataSource.sortingDataAccessor = (data: OperationAccounts, sortHeaderId: string) => {
            switch (sortHeaderId) {
              case 'accountFrom':
                return data.accountFrom.name.toLowerCase();
              case 'accountTo':
                return data.accountTo.name.toLowerCase();
              case 'amount':
                return data.amount;
              case 'createdOn':
                return data.createdOn;
              default:
                return '';
            }
          };
        }
        this.filterData();
      },
      () => {
        this.snackBar.showSnackBar('Ошибка при получении операций.');
      },
    );
  }

  public onDateRangeChange(): void {
    if (this.dateRangeForm.invalid) return;
    this.startDate = this.dateRangeForm.controls['start'].value;
    this.endDate = this.dateRangeForm.controls['end'].value;
    this.selectedFilter = '';
    this.filterDataByDateRange();
  }

  public filterDataByDateRange(): void {
    const dateStart = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
    const dateEnd = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());

    this.dataSource.data = this.empData.filter((transaction) => {
      const transactionDate = new Date(
        new Date(transaction.createdOn).getFullYear(),
        new Date(transaction.createdOn).getMonth(),
        new Date(transaction.createdOn).getDate(),
      );

      return transactionDate.getTime() >= dateStart.getTime() && transactionDate.getTime() <= dateEnd.getTime();
    });

    this.dataSource.paginator.firstPage();
  }

  public filterData(): void {
    const currentDate = new Date();
    const weekAgoDate = new Date();
    const monthAgoDate = new Date();
    weekAgoDate.setDate(currentDate.getDate() - 7);
    monthAgoDate.setDate(currentDate.getDate() - 30);
    switch (this.selectedFilter) {
      case 'day':
        this.dataSource.data = this.empData.filter((transaction) => {
          const transactionDate = new Date(transaction.createdOn);
          return (
            transactionDate.getFullYear() === currentDate.getFullYear() &&
            transactionDate.getMonth() === currentDate.getMonth() &&
            transactionDate.getDate() === currentDate.getDate()
          );
        });
        break;
      case 'week':
        this.dataSource.data = this.empData.filter((transaction) => {
          const transactionDate = new Date(transaction.createdOn);
          return transactionDate >= weekAgoDate && transactionDate <= currentDate;
        });
        break;
      case 'month':
        this.dataSource.data = this.empData.filter((transaction) => {
          const transactionDate = new Date(transaction.createdOn);
          return transactionDate >= monthAgoDate && transactionDate <= currentDate;
        });
        break;
      default:
        this.dataSource.data = this.empData;
        break;
    }
    this.dataSource.paginator.firstPage(); // сброс пагинации при фильтрации
  }

  public nameComparator(a: any, b: any): number {
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
  }

  public addOperation(): void {
    const body: any = {
      accountFromId: 5,
      accountToId: 4,
      amount: 500,
      createdOn: '2023-05-30 08:12:23',
      description: 'Перевод5',
    };
    this.movingService.addOperation(body, this.params).subscribe(
      (value: OperationAccounts) => {
        console.log(value);
      },
      () => {
        this.snackBar.showSnackBar('Ошибка!');
      },
    );
  }
}
