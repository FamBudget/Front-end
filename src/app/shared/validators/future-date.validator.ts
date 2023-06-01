import { AbstractControl } from '@angular/forms';

export function FutureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const currentDate = new Date();
  const inputDate = new Date(control.value);
  if (inputDate <= currentDate) {
    return null;
  } else {
    return { futureDate: true };
  }
}
