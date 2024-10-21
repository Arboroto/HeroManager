import { Component } from '@angular/core';
import { CustomLoaderService } from './custom-loader.service';

@Component({
  selector: 'app-custom-loader',
  templateUrl: './custom-loader.component.html',
  styleUrls: ['./custom-loader.component.scss'],
  standalone: true
})
export class CustomLoaderComponent {
  isLoading: boolean = false;
  constructor(private loaderService: CustomLoaderService) { }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
}
