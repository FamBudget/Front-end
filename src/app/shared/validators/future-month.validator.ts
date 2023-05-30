import { AbstractControl } from '@angular/forms';

export function FutureMonthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const currentDate = new Date();
  const inputDate = new Date(control.value);

  if (inputDate.getMonth() <= currentDate.getMonth()) {
    return null;
  } else {
    return { futureMonth: true };
  }
}
