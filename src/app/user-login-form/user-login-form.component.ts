// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// Close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Bring in the API calls 
import { fetchApiDataService } from '../fetch-api-data.service';

// Display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: fetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
    // Logic for a successful user login goes here! (To be implemented)
    console.log(result)
    localStorage.setItem('user', result.user.Username);
    localStorage.setItem('token', result.token);
    localStorage.setItem('favorites', result.favoriteMovies);
    this.dialogRef.close(); // This will close the modal on success!
    this.snackBar.open(result, 'OK', {
        duration: 3000
    });
    this.router.navigate(['movies']);
    }, (result) => {
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 3000
      });
    });
  }
}