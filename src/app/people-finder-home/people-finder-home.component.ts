import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PeopleFinderPreviewService } from './services/people-finder-preview.service';
import { PeopleFinderPreviewRequest } from '../model/people-finder-preview-request.mapper';
import { EmployeePreview } from '../model/EmployeePreview';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'people-finder-home',
  templateUrl: './people-finder-home.component.html',
  styleUrls: ['./people-finder-home.component.scss']
})
export class PeopleFinderHomeComponent implements OnInit, OnChanges {
  title = 'People Finder';
  peopleSecondaryForm: FormGroup;
  peoplePrimaryForm: FormGroup;
  empList: EmployeePreview[];
  constructor(
    private fb: FormBuilder,
    private peopleFinderPreviewService: PeopleFinderPreviewService,
    private toasterService: ToastrService
  ) {
  }
  ngOnChanges() {

  }
  ngOnInit() {
    this.intializeForm();
    this.formChanges();
  }
  private formChanges(): void {
    this.peoplePrimaryForm.controls.employeeID.valueChanges.forEach(value => {
      this.peopleSecondaryForm.disable({ emitEvent: false, onlySelf: true });
      if (value.toString().trim() === '') this.peopleSecondaryForm.enable({ emitEvent: false, onlySelf: true });
    });
    this.peopleSecondaryForm.valueChanges.forEach(value => {
      this.peoplePrimaryForm.disable({ emitEvent: false, onlySelf: true });
      if (
        value.firstName.toString().trim() === '' &&
        value.middleName.toString().trim() === '' &&
        value.lastName.toString().trim() === '' &&
        value.designation.toString().trim() === '' &&
        value.project.toString().trim() === '' &&
        value.account.toString().trim() === ''
      )
        this.peoplePrimaryForm.enable({ emitEvent: false, onlySelf: true });
    });
  }
  private intializeForm(): void {
    this.peoplePrimaryForm = this.fb.group({
      employeeID: ''
    });
    this.peopleSecondaryForm = this.fb.group({
      firstName: '',
      middleName: '',
      lastName: '',
      designation: '',
      project: '',
      account: ''
    });
  }
  searchClicked(): void {
    if (this.peoplePrimaryForm.enabled)
      this.peopleFinderPreviewService.getEmployee(this.getEmployeePreviewRequest())
        .subscribe(this.peopleFinderPreviewServiceSuccess);
    else
      this.peopleFinderPreviewService.getEmployeeList(this.getEmployeePreviewRequest())
        .subscribe(this.peopleFinderPreviewListServiceSuccess);
  }
  private peopleFinderPreviewServiceSuccess = (employeePreview: EmployeePreview[]) => {
    if (employeePreview && employeePreview.length > 0) {
      this.toasterService.success("Employee list fetched success.");
      this.empList = employeePreview;
    }
  }
  private peopleFinderPreviewListServiceSuccess = (employeePreview: EmployeePreview[]) => {
    if (employeePreview && employeePreview.length > 0) {
      this.toasterService.success("Employee list fetched success.");
      this.empList = employeePreview;
    }
  }
  private getEmployeePreviewRequest(): PeopleFinderPreviewRequest {
    let requestBody: PeopleFinderPreviewRequest = {};
    if (this.peoplePrimaryForm.controls.employeeID.value) requestBody.empid = this.peoplePrimaryForm.controls.employeeID.value;
    if (this.peopleSecondaryForm.controls.firstName.value) requestBody.firstName = this.peopleSecondaryForm.controls.firstName.value;
    if (this.peopleSecondaryForm.controls.middleName.value) requestBody.middleName = this.peopleSecondaryForm.controls.middleName.value;
    if (this.peopleSecondaryForm.controls.lastName.value) requestBody.lastName = this.peopleSecondaryForm.controls.lastName.value;
    if (this.peopleSecondaryForm.controls.designation.value) requestBody.designation = this.peopleSecondaryForm.controls.designation.value;
    if (this.peopleSecondaryForm.controls.project.value) requestBody.project = this.peopleSecondaryForm.controls.project.value;
    if (this.peopleSecondaryForm.controls.account.value) requestBody.account = this.peopleSecondaryForm.controls.account.value;
    return requestBody;
  }
  showEmployeeList(): boolean {
    return (this.empList && this.empList.length > 0);
  }
  showSearchArea(): void {
    this.empList = [];
  }
}
