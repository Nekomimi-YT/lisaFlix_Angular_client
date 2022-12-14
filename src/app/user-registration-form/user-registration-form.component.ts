// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// Closes dialogs
import { MatDialogRef } from '@angular/material/dialog';

// Connects to the API call service
import { FetchApiDataService } from '../fetch-api-data.service';

// Display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {}

  // Send the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
    this.dialogRef.close(); // Close the modal on success
    console.log(result)
    this.snackBar.open("Success! Please login.", 'OK', {
        duration: 4000
    });
  }, (result) => {
    this.snackBar.open(result, 'OK', {
      duration: 4000
    });
  });
}
}
