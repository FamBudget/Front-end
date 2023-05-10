import { FormGroup } from '@angular/forms';

export const passwordsMatchValidator = (form: FormGroup): void => {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  if (password?.value !== confirmPassword?.value) {
    confirmPassword?.setErrors({ value: 'Пароли не совпадают' });
  }
};
