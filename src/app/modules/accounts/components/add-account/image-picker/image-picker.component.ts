import { Component, EventEmitter, Output } from '@angular/core';
import { ACCOUNT_ICONS_DATA, AccountIcon } from '../../..';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent {
  public images: Array<AccountIcon> = ACCOUNT_ICONS_DATA;
  public selectedImage: AccountIcon = this.images[0];
  @Output() icon = new EventEmitter();
  constructor(private dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '400px',
      data: { images: this.images },
      panelClass: 'accounts-image-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedImage = result;
        this.sendIcon();
      }
    });
  }

  public sendIcon(): void {
    this.icon.emit(this.selectedImage);
  }
}
