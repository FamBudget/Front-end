import { Component } from '@angular/core';
import { ACCOUNT_ICONS_DATA } from '../../..';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent {
  public images = ACCOUNT_ICONS_DATA;
  public selectedImage = this.images[0];
  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '400px',
      data: { images: this.images },
      panelClass: 'accounts-image-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedImage = result;
        console.log('Selected image ID:', result.id);
      }
    });
  }
}
