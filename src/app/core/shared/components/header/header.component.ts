import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CapitalizeWordPipe } from '../../pipes/capitalize-word.pipe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CapitalizeWordPipe
  ],
})
export class HeaderComponent {
  constructor(private router: Router) { }

  navigateHome() {
    this.router.navigate(['public/home']);
  }
}
