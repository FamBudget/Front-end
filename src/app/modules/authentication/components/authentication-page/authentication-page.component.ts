import { Component } from '@angular/core';
import { DialogService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PasswordRecoverySecondDialogComponent } from '..';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss'],
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
    this.matDialog.open(PasswordRecoverySecondDialogComponent, {});
  }

  public openDialog(): void {
    this.dialog.openDialog();
  }
}
