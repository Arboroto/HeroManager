import { Component } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Hero } from 'src/app/core/models/hero.interface';
import { HeroService } from 'src/app/core/shared/services/hero.service';
import { ToastService } from 'src/app/core/shared/services/toast.service';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styleUrls: ['./heroes-home.component.scss']
})
export class HeroesHomeComponent {


  constructor(
    public heroService: HeroService,
    public toastService: ToastService){}

  ngOnInit(): void{
  }

  testInterceptor() {
    this.heroService.callLoader().subscribe(res=>{
      this.toastService.show(res.fact, 5000)
    });
  }
}
