import { Injectable } from '@angular/core';
import { AuthenticationDialogComponent } from '../components';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog() {
    this.dialog.open(AuthenticationDialogComponent, {
      width: '100%',
      maxWidth: '720px',
      role: 'dialog',
    });
  }
}
