import { Component } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
    } as Intl.DateTimeFormatOptions,
  },
};

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS }],
})
export class AccountsTableComponent {
  public date: Date = new Date();

  constructor(private readonly adapter: DateAdapter<Date>) {}

  ngOnInit(): void {
    this.adapter.setLocale('Ru');
  }

  modelChanged(date: string) {
    this.date = new Date(Date.parse(date));
  }
}
