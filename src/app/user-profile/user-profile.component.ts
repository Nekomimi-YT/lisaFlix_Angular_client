import { Component, OnInit, Input } from '@angular/core';

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
  profileBd = this.birthday?.slice(0,10);

  @Input() updatedInfo = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: fetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {}

  /*
  formatBirthday(birthday): string {
    let profileBdArray: []; => define in constructor?? 
    this.profileBdArray = this.birthday?.slice(0,10).split('-'); => create an array: [yyyy,mm,dd]
    let profileBd = this.profileBdArray?.push(this.profileBdArray.shift().join('/')); push the year to the end and join with /'s
    return profileBd;
  }
  */
  
  // Update the user's profile information and return a confirmation
  updateUser(): void {
    this.fetchApiData.editUserInfo(this.updatedInfo).subscribe((result) => {
      console.log(result)
      localStorage.setItem('user', this.updatedInfo.Username);
      localStorage.setItem('email', this.updatedInfo.Email);
      localStorage.setItem('birthday', this.updatedInfo.Birthday);
      setTimeout(() => {
        location.reload();
      }, 3500);
      this.snackBar.open('Profile updated!', 'OK', {
        duration: 4000
      });
    });
  }

  // Delete user's account and send user back to welcome page
  deleteUserProfile(): void {
      this.router.navigate(['welcome'])
      .then(() => {
        this.snackBar.open('You have successfully deleted your profile', 'OK', {
          duration: 4000
      });
    });
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
    localStorage.clear();
  }
}
