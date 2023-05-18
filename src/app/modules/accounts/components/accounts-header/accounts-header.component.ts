import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts-header',
  templateUrl: './accounts-header.component.html',
  styleUrls: ['./accounts-header.component.scss'],
})
export class AccountsHeaderComponent {
  public title: string = 'Счета';
}
