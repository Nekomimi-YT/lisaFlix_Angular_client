import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user = localStorage.getItem('user');

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  // Route to profile page
  openProfileView(): void {
    this.router.navigate(['profile']);
  }

  // Logout and send user back to welcome page
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']).then(() => {
      this.snackBar.open('You have successfully logged out', 'OK', {
        duration: 3500,
      });
    });
  }
}
