import { Component } from '@angular/core';
import { LogoutDialogComponent } from './logout-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private matDialog: MatDialog) {}

  public openModalLogout(): void {
    this.matDialog.open(LogoutDialogComponent, {
      panelClass: 'logout-dialog',
      width: '100%',
      maxWidth: '600px',
      position: {
        top: '5%',
      },
    });
  }
}
