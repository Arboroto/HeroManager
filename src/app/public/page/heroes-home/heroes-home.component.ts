import { Component } from '@angular/core';
import { HeroService } from '../../../core/shared/services/hero.service';
import { ToastService } from '../../../core/shared/services/toast.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CustomLoaderService } from '../../../core/shared/services/custom-loader.service';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styleUrls: ['./heroes-home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule 
  ]
})
export class HeroesHomeComponent {
  constructor(
   public heroService: HeroService,
   public toastService: ToastService,
   public loaderService: CustomLoaderService
  ) {}

  ngOnInit(): void {
  }

  testInterceptor() {
    this.loaderService.show();
    this.heroService.callLoader().subscribe(res => {
      this.loaderService.hide();
      this.toastService.show(res.fact, 5000);
   });
  }
}

