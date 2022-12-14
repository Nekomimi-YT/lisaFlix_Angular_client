import { Component, OnInit, Input } from '@angular/core';

// Close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Bring in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Send form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        localStorage.setItem('favorites', result.user.favoriteMovies);
        localStorage.setItem('email', result.user.Email);
        localStorage.setItem('birthday', result.user.Birthday);
        this.dialogRef.close(); // This will close the modal on success!
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 4000,
        });
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
