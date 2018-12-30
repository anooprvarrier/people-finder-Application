import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeePreview } from 'src/app/model/employee-preview.model';
import { MatDialog } from '@angular/material';
import { EmployeeDetailsDialogComponent } from '../employee-details-dialog/employee-details-dialog.component';
import { EmployeeDetailsService } from '../services/empoyee-details.service';
import { EmployeeDetails } from 'src/app/model/employee-details.model';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  @Input() set employeeList(employeeDetails: EmployeePreview[]) {
    this.empList = employeeDetails;
  };
  @Output() showSearch = new EventEmitter();
  empList = new Array<EmployeePreview>();
  employeeDetails: EmployeeDetails;
  constructor(
    private dialog: MatDialog,
    private employeeDetailsService: EmployeeDetailsService
  ) {
    this.empList = [];
  }
  backToSearch(): void {
    this.showSearch.emit("true");
  }
  openDialog(emplid: string): void {
    this.employeeDetailsService.getEmployeeDetails(emplid).subscribe(
      (response: EmployeeDetails) => {
        this.employeeDetails = response;
        const dialogRef = this.dialog.open(EmployeeDetailsDialogComponent, {
          width: '500px',
          height: '400px',
          data: this.employeeDetails
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
    );
  }
}
