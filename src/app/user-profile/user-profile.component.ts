import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
//import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { fetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit{
  user = localStorage.getItem('user');
  email = localStorage.getItem('email');
  birthday = localStorage.getItem('birthday');

  @Input() updatedInfo = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: fetchApiDataService,
    //public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
   }
  

  // Update the user's profile information and return a confirmation
  updateUser(): void {
    this.fetchApiData.editUserInfo(this.updatedInfo).subscribe((result) => {
     // this.dialogRef.close(); // This will close the modal on success
      console.log(result)
      localStorage.setItem('user', this.updatedInfo.Username);
      localStorage.setItem('email', this.updatedInfo.Email);
      if (this.updatedInfo.Birthday != null) {
        localStorage.setItem('birthday', this.updatedInfo.Birthday);
      }
      this.snackBar.open('Profile updated!', 'OK', {
        duration: 3500
      });
    });
  }

  // Delete user's account and send user back to welcome page
  deleteUserProfile(): void {
      this.router.navigate(['welcome'])
      .then(() => {
        this.snackBar.open('You have successfully deleted your profile', 'OK', {
          duration: 3500
      });
    });
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
    localStorage.clear();
  }
}
