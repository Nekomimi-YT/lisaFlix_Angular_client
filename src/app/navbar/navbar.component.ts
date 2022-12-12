import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user = localStorage.getItem('user');

  constructor(
    private router: Router
  ) { }

  openProfileView(): void {
    this.router.navigate(['profile']);
  }

}
