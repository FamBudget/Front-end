import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountIcon } from '../../../models';
import { ACCOUNT_ICONS_DATA } from '../../..';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent {
  public images: AccountIcon[] = ACCOUNT_ICONS_DATA;
  public selectedImage: AccountIcon = this.images[0];

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: AccountIcon[] },
  ) {
    this.images = data.images;
  }

  public selectImage(image: AccountIcon): void {
    this.selectedImage = image;
  }

  public ok(): void {
    this.dialogRef.close(this.selectedImage);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
