import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountIcon } from '../../../models';
import { ACCOUNT_ICONS_DATA } from '../..';

@Component({
  selector: 'app-select-icon-toggle',
  templateUrl: './select-icon-toggle.component.html',
  styleUrls: ['./select-icon-toggle.component.scss'],
})
export class SelectIconToggleComponent {
  @Input() isTileLayout: boolean = false;
  @Output() toggleLayout: EventEmitter<boolean> = new EventEmitter();

  public accountIconOptions: AccountIcon[] = ACCOUNT_ICONS_DATA;
  public selectedLayout: AccountIcon = this.accountIconOptions[0];

  constructor() {}

  ngOnInit(): void {
    this.selectedLayout = this.accountIconOptions[0];
  }

  public toggle(event: any): void {
    this.toggleLayout.emit(event.value);
  }

  public compareFn(f1: any, f2: any): boolean {
    return f1 && f2 ? f1.viewValue === f2.viewValue : f1 === f2;
  }
}
