import { Component, OnInit, Input } from '@angular/core';

// Brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { format } from 'date-fns';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user = localStorage.getItem('user');
  email = localStorage.getItem('email');
  birthday = localStorage.getItem('birthday');
  profileBd: string = this.formatBirthday();

  @Input() updatedInfo = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Format date syntax using date-fns format
   * @returns {string} bdFormatted
   */
  formatBirthday(): string {
    this.birthday = localStorage.getItem('birthday') || '0000-00-00';
    let bdFormatted: string = format(
      new Date(this.birthday.slice(0, 10)),
      'MM/dd/yyyy'
    );
    return bdFormatted;
  }

  /**
   * Update the user's profile information and return a confirmation
   * 
   * @returns {object} result - updated user info
   * 
   * Reset user info in local storage
   */
  updateUser(): void {
    this.fetchApiData.editUserInfo(this.updatedInfo).subscribe((result) => {
      console.log(result);
      localStorage.setItem('user', this.updatedInfo.Username);
      localStorage.setItem('email', this.updatedInfo.Email);
      localStorage.setItem('birthday', this.updatedInfo.Birthday);
      setTimeout(() => {
        location.reload();
      }, 3500);
      this.snackBar.open('Profile updated!', 'OK', {
        duration: 4000,
      });
    });
  }

  /**
   * Delete user's account and send user back to welcome page
   * Clears local storage
   */
  deleteUserProfile(): void {
    this.router.navigate(['welcome']).then(() => {
      this.snackBar.open('You have successfully deleted your profile', 'OK', {
        duration: 4000,
      });
    });
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
    localStorage.clear();
  }
}
