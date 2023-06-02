import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isLoading = true;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.isLoadingState$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
