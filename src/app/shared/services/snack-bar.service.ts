import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'any',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public showSnackBar(msg: string, action?: string): void {
    this.snackBar.open(msg, action!, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      politeness: 'assertive',
    });
  }
}
