import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PeopleFinderHomeComponent } from '../people-finder-home.component';

@Component({
  selector: 'app-employee-details-dialog',
  templateUrl: './employee-details-dialog.component.html',
  styleUrls: ['./employee-details-dialog.component.scss']
})
export class EmployeeDetailsDialogComponent {
  title: string = "Employee profile details";
  constructor(
    public dialogRef: MatDialogRef<PeopleFinderHomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCloseClicked(): void {
    this.dialogRef.close();
  }

}
