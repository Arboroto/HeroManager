import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hero } from '../../../core/models/hero.interface';
import { ConfirmModalComponent } from '../../../core/shared/components/confirm-modal/confirm-modal.component';
import { HeroService } from '../../../core/shared/services/hero.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIcon
  ]
})
export class HeroCardComponent {

  @Input() hero!: Hero;

  constructor(
    private heroService: HeroService, 
    private dialog: MatDialog,
    private router: Router){}

    openDialog(){
      const dialogRef = this.dialog.open(ConfirmModalComponent);
      dialogRef.afterClosed().subscribe(res=>{
        res ? this.deleteHero() : '';
      })
    }
  
    deleteHero() {
      this.heroService.deleteHero(this.hero.id!).subscribe({
        next: (res)=>{},
        error: (res)=>{
          console.error("Error al eliminar", res)
        }
      })
    }
  
    editHero(h: Hero){
      this.router.navigate(['public/form'], { queryParams: { id: h.id } });
    }
}
