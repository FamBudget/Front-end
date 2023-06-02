import { AbstractControl } from '@angular/forms';

export function EmptyStringValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;

  if (value && value.trim().length === 0) {
    return { emptyString: true };
  }

  return null;
}
