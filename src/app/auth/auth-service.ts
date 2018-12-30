import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private toasterService: ToastrService
    ) {
    }
    login(email: string, password: string): Observable<User> {
        return this.http.post<User>('/api/login', { email, password })
            .pipe(
                tap(response => response),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }
    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 500)
            this.toasterService.error("Internal server error.");
        else if (error.status === 403)
            this.toasterService.error("Login Failed. Please try again.");
        else this.toasterService.error("Server side failure. Please try later.");
        return new Observable<never>();
    }
}