import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../../core/shared/services/hero.service';
import { Subscription } from 'rxjs';
import { Hero } from '../../../core/models/hero.interface';
import { MatButtonModule } from '@angular/material/button';
import { HeroListElementComponent } from '../../components/hero-list-element/hero-list-element.component';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { SearchPipe } from '../../../core/shared/pipes/search.pipe';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { CapitalizeFirstLetterPipe } from '../../../core/shared/pipes/capitalize-first-letter.pipe';
import { CapitalizeWordPipe } from '../../../core/shared/pipes/capitalize-word.pipe';

@Component({
  selector: 'app-hero-gallery',
  templateUrl: './hero-gallery.component.html',
  styleUrls: ['./hero-gallery.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatIconModule,
    MatButtonToggleModule,
    HeroListElementComponent,
    HeroCardComponent,
    SearchPipe,
    CapitalizeFirstLetterPipe,
    CapitalizeWordPipe
  ]
})
export class HeroGalleryComponent implements OnInit, OnDestroy {
  public heroes: Hero[] = [];
  heroModified!: Hero;
  newHero!: Hero;
  private heroesSubscription!: Subscription;
  value: any;

  constructor(private heroService: HeroService) {
    this.heroesSubscription = this.heroService.heroes$.subscribe({
      next: (heroes) => {
        this.heroes = heroes;
      }
    });
  }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe({
      next: (heroes) => {
        this.heroes = heroes;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.heroesSubscription) {
      this.heroesSubscription.unsubscribe();
    }
  }
}

