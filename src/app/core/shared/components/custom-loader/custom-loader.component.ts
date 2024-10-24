import { Component, OnInit } from '@angular/core';
import { CustomLoaderService } from '../../services/custom-loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-loader',
  templateUrl: './custom-loader.component.html',
  styleUrls: ['./custom-loader.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
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
