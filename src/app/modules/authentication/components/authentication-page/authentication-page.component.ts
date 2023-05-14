import { Component } from '@angular/core';
import { DialogService } from '../../services';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  providers: [DialogService],
})
export class AuthenticationPageComponent {
  constructor(private dialog: DialogService) {}

  public openDialog(): void {
    this.dialog.openDialog();
  }
}
