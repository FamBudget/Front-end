import { Component } from '@angular/core';
import { DialogService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PasswordRecoverySecondDialogComponent } from '..';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  providers: [DialogService],
})
export class AuthenticationPageComponent {
  constructor(private dialog: DialogService, private route: ActivatedRoute, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['code'] && params['email']) {
        this.openPasswordRecoveryDialog();
      }
    });
  }

  public openPasswordRecoveryDialog(): void {
    this.matDialog.open(PasswordRecoverySecondDialogComponent, {
      width: '100%',
      maxWidth: '650px',
    });
  }

  public openDialog(): void {
    this.dialog.openDialog();
  }
}
