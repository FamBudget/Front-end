import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_MESSAGES } from 'src/app/enums';
import { SnackBarService } from 'src/app/shared/services';

@Component({
  selector: 'app-income-input-form',
  templateUrl: './income-input-form.component.html',
  styleUrls: ['./income-input-form.component.scss'],
})
export class IncomeInputFormComponent {
  public incomeInputForm: FormGroup = new FormGroup({});
  protected readonly ERROR_MESSAGES = ERROR_MESSAGES;

  constructor(private fb: FormBuilder) {}

  public get f() {
    return this.incomeInputForm.controls;
  }

  ngOnInit(): void {
    this.incomeInputForm = this.fb.group({});
  }
}
