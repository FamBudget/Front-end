import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/authentication';
import { LocalStorageService } from 'src/app/shared/services';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss'],
})
export class LogoutDialogComponent {
  constructor(
    public localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    public authService: AuthenticationService,
    private router: Router,
  ) {}

  public ok(): void {
    let email: string = this.localStorageService.getItem('email') as string;
    if (email) {
      this.authService.logout(email);
    }
    this.router.navigate(['/']);
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
