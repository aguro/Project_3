import { Injectable } from '@angular/core';
import { ScheduleHttpService } from './schedule-http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISchedule } from '../models/schedule.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/user/services/user-data.service';
import { IUser } from 'src/app/user/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDataService {

  public userList$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _scheduleHttpService: ScheduleHttpService, private _toastrService: ToastrService, private _router: Router, private _userDataService: UserDataService) {
    this.getUsers();
  }

  public getSchedule(): Observable<Object> {
    return this._scheduleHttpService.getSchedule();
  }

  public getUserSchedule(userId: number): Observable<Object> {
    return this._scheduleHttpService.getUserSchedule(userId);
  }

  public addSchedule(schedule: ISchedule): Object {
    return this._scheduleHttpService.addSchedule(schedule).subscribe(
      (response: any) => {
        this._toastrService.success(response.message);
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this._router.navigate(['/schedule']);
        });
      },
      (error) => {
        this._toastrService.error(error.error.message);
      }
    );
  }

  public editSchedule(schedule: ISchedule): Object {
    return this._scheduleHttpService.editSchedule(schedule).subscribe(
      (response: any) => {
        this._toastrService.success(response.message);
        location.reload();
      },
      (error) => {
        this._toastrService.error(error.error.message);
      }
    )
  }

  public getUserFullName(userId: string): string {
    const user = this.userList$.value.find((user: IUser) => user.user_id === userId);
    if (user) {
      return `${user.firstname} ${user.lastname}`;
    }
    return '';
  }

  public deleteSchedule(scheduleId: string): Object {
    return this._scheduleHttpService.deleteSchedule(scheduleId).subscribe(
      (response: any) => {
        this._toastrService.success(response.message);
        location.reload();
      },
      (error) => {
        this._toastrService.error(error.error.message);
      }
    )
  }

  private getUsers(): Object {
    return this._userDataService.getUsers().subscribe(
      (users) => {
        this.userList$.next(users);
      }
    )
  }
}
