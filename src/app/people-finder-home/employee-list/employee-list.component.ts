import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeePreview } from 'src/app/model/EmployeePreview';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  @Input() set employeeList(employeeDetails: EmployeePreview[]) {
    this.empList = employeeDetails;
  };
  @Output() showSearch= new EventEmitter();
  empList=new Array<EmployeePreview>();
  constructor() {
    this.empList = [];
   }
   backToSearch(): void{
    this.showSearch.emit("true");
   }
}
