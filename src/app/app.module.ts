import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatNativeDateModule, MatListModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleFinderHomeComponent } from './people-finder-home/people-finder-home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth-service';
import { PeopleFinderPreviewService } from './people-finder-home/services/people-finder-preview.service';
import { EmployeeListComponent } from './people-finder-home/employee-list/employee-list.component';
import { EmployeeDetailsDialogComponent } from './people-finder-home/employee-details-dialog/employee-details-dialog.component';
import { EmployeeDetailsService } from './people-finder-home/services/empoyee-details.service';

@NgModule({
  declarations: [
    AppComponent,
    PeopleFinderHomeComponent,
    LoginComponent,
    EmployeeListComponent,
    EmployeeDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    MatNativeDateModule
  ],
  providers: [
    AuthService,
    PeopleFinderPreviewService,
    EmployeeDetailsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeDetailsDialogComponent, EmployeeListComponent],
})
export class AppModule { }
