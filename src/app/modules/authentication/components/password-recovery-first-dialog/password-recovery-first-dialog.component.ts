import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PasswordRecoverySecondDialogComponent } from '..';

@Component({
  selector: 'app-password-recovery-first-dialog',
  templateUrl: './password-recovery-first-dialog.component.html',
})
export class PasswordRecoveryFirstDialogComponent {
  constructor(public dialog: MatDialog) {}

  public openDialog() {
    this.dialog.closeAll();
    this.dialog.open(PasswordRecoverySecondDialogComponent, {
      width: '100%',
      maxWidth: '720px',
    });
  }
}
