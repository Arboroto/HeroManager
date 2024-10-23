import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hero } from '../../../core/models/hero.interface';
import { ConfirmModalComponent } from '../../../core/shared/components/confirm-modal/confirm-modal.component';
import { HeroService } from '../../../core/shared/services/hero.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CapitalizeFirstLetterPipe } from '../../../core/shared/pipes/capitalize-first-letter.pipe';

@Component({
  selector: 'app-hero-list-element',
  templateUrl: './hero-list-element.component.html',
  styleUrls: ['./hero-list-element.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    CapitalizeFirstLetterPipe
  ]
})
export class HeroListElementComponent {

  constructor(
    private heroService: HeroService, 
    private dialog: MatDialog,
    private router: Router){}

  @Input() hero!: Hero;

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
