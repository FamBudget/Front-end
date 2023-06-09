import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent {
  images: any[];
  selectedImage: any;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: any[] },
  ) {
    this.images = data.images;
  }

  selectImage(image: any) {
    this.selectedImage = image;
  }

  ok() {
    this.dialogRef.close(this.selectedImage);
  }

  cancel() {
    this.dialogRef.close();
  }
}
