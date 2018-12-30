import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PeopleFinderPreviewRequest } from 'src/app/model/people-finder-preview-request.mapper';
import { EmployeePreview } from 'src/app/model/EmployeePreview';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PeopleFinderPreviewService {
    constructor(
        private http: HttpClient,
        private toasterService: ToastrService
    ) { }

    getEmployee(requestBody: PeopleFinderPreviewRequest): Observable<EmployeePreview[]> {
        const url = '/api/getEmployeeByID';
        return this.http.post<EmployeePreview[]>(url, requestBody).pipe(
            tap(response => response),
            catchError((err: HttpErrorResponse) => this.handleError(err))
        );
    }
    getEmployeeList(requestBody: PeopleFinderPreviewRequest): Observable<EmployeePreview[]> {
        const url = '/api/getEmployees';
        return this.http.post<EmployeePreview[]>(url, requestBody).pipe(
            tap(response => {
                if (!response || (response && response.length === 0))
                    this.toasterService.info("No records found.");
                else return response;
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