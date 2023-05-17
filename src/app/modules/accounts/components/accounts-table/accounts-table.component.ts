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
