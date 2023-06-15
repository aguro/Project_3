import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './user/components//signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './user/components/login/login.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { ScheduleComponent } from './schedule/components/schedule/schedule.component';
import { DeleteScheduleModalComponent } from './schedule/components/delete-schedule-modal/delete-schedule-modal.component';
import { AddScheduleModalComponent } from './schedule/components/add-schedule-modal/add-schedule-modal.component';
import { EditScheduleModalComponent } from './schedule/components/edit-schedule-modal/edit-schedule-modal.component';
import { UserScheduleComponent } from './schedule/components/user-schedule/user-schedule.component';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';
import { EditUserModalComponent } from './user/components/edit-user-modal/edit-user-modal.component';
import { EditPasswordModalComponent } from './user/components/edit-password-modal/edit-password-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './auth/interceptors/jwt.interceptor';
import { AuthGuard } from './auth/guard/auth.guard';
import { DeleteUserModalComponent } from './user/components/delete-user-modal/delete-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavComponent,
    ScheduleComponent,
    DeleteScheduleModalComponent,
    AddScheduleModalComponent,
    EditScheduleModalComponent,
    UserScheduleComponent,
    UserProfileComponent,
    EditUserModalComponent,
    EditPasswordModalComponent,
    DeleteUserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
