import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { ERROR_MESSAGES } from 'src/app/enums';

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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS }],
})
export class AccountsTableComponent implements OnInit {
  public startDate: Date = new Date();
  public endDate: Date = new Date();

  public dateRangeForm: FormGroup = new FormGroup({
    fromDate: new FormControl(this.startDate, Validators.required),
    toDate: new FormControl(this.endDate, Validators.required),
  });
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(private readonly adapter: DateAdapter<Date>, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.startDate = new Date(this.startDate.getTime() - 29 * 24 * 60 * 60 * 1000);
    this.adapter.setLocale('Ru');
    this.dateRangeForm = this.formBuilder.group({
      fromDate: new FormControl(this.startDate, Validators.required),
      toDate: new FormControl(this.endDate, Validators.required),
    });
  }

  public get f() {
    return this.dateRangeForm.controls;
  }

  public onFormSubmit(): void {
    if (this.dateRangeForm.invalid) return;
  }
}
