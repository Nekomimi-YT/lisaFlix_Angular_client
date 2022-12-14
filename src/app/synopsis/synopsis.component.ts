import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})

export class SynopsisComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    },
    public dialogRef: MatDialogRef<SynopsisComponent>

  ) {}
  
  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
