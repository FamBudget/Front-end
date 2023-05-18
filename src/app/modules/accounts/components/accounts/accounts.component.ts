import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAccountComponent } from '../add-account';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {
  constructor(public dialog: MatDialog) {}

  public openAccountDialog() {
   let addDialogRef =  this.dialog.open(AddAccountComponent, {
      width: '100%',
      maxWidth: '720px',
    });

    addDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }
}
