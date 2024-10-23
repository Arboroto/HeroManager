import { Component } from '@angular/core';
import { HeroService } from '../../../core/shared/services/hero.service';
import { ToastService } from '../../../core/shared/services/toast.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styleUrls: ['./heroes-home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class HeroesHomeComponent {
  constructor(
   public heroService: HeroService,
   public toastService: ToastService
  ) {}

  ngOnInit(): void {
  }

  testInterceptor() {
    this.heroService.callLoader().subscribe(res => {
      this.toastService.show(res.fact, 5000);
   });
  }
}

