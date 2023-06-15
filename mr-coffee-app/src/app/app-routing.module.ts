import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './user/components/signup/signup.component';
import { LoginComponent } from './user/components/login/login.component';
import { ScheduleComponent } from './schedule/components/schedule/schedule.component';
import { UserScheduleComponent } from './schedule/components/user-schedule/user-schedule.component';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'schedule', pathMatch: 'full' },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'schedule/user/:id',
    component: UserScheduleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
