import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from 'rxjs/operators';
import { EmployeeDetails } from 'src/app/model/employee-details.model';

@Injectable()
export class EmployeeDetailsService {
    constructor(
        private http: HttpClient,
        private toasterService: ToastrService
    ) { }

    getEmployeeDetails(empid: string): Observable<EmployeeDetails> {
        const url = '/api/employeeDetails';
        return this.http.post<EmployeeDetails>(url, { employeeId: empid }).pipe(
            tap((response: EmployeeDetails) => {
                if (!response)
                    this.toasterService.info("No records found.");
                else return response
            }),
            catchError((err: HttpErrorResponse) => this.handleError(err))
        );
    }
    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 500)
            this.toasterService.error("Internal server error.");
        else if (error.status === 403)
            this.toasterService.info("No records found.");
        else this.toasterService.error("Server side failure. Please try later.");
        return new Observable<never>();
    }
}