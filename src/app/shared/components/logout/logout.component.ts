import { Component, HostListener } from '@angular/core';
import { LogoutDialogComponent } from './logout-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  public isSmallScreen: boolean = window.innerWidth <= 550;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isSmallScreen = window.innerWidth <= 550;
  }

  constructor(private matDialog: MatDialog) {}

  public openModalLogout(): void {
    const dialogRef = this.matDialog.open(LogoutDialogComponent, {
      panelClass: 'logout-dialog',
      width: '100%',
      maxWidth: '550px',
      position: {
        top: this.isSmallScreen ? '50%' : '5%',
      },
    });

    window.addEventListener('resize', () => {
      this.isSmallScreen = window.innerWidth <= 550;
      dialogRef.updatePosition({
        top: this.isSmallScreen ? '50%' : '5%',
      });
    });
  }
}
