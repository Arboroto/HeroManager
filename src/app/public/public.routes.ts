import { Routes } from '@angular/router';
import { PublicComponent } from './public.component';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' } 
    ]
  }
];
