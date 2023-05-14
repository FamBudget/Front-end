import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'any',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public showSnackBar(msg: string, action?: string): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'custom-snackbar',
      politeness: 'assertive',
    };

    this.snackBar.open(msg, action!, config);
  }
}
