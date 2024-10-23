import { Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { CreateEditHeroComponent } from './page/create-edit-hero/create-edit-hero.component';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
        {
          path: 'form/:id',
          component: CreateEditHeroComponent
        },
        {
          path: 'form',
          component: CreateEditHeroComponent
        },
      ]
  }
];
