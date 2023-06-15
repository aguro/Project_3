import { Component, OnInit } from '@angular/core';
import { ScheduleDataService } from '../../services/schedule-data.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDataService } from 'src/app/user/services/user-data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public schedule?: any;

  constructor(private _scheduleDataService: ScheduleDataService, private _authService: AuthService, private _userDataService: UserDataService) { }

  public ngOnInit(): void {
    this.getSchedule();
  }

  public getUserFullName(userId: string): string {
    return this._scheduleDataService.getUserFullName(userId);
  }

  public getUserId(): number {
    return Number(this._userDataService.userId);
  }

  public get isUserLoggedIn(): boolean {
    return this._authService.isUserLoggedIn;
  }

  private getSchedule(): void {
    this._scheduleDataService.getSchedule().subscribe(
      (schedule) => {
        this.schedule = schedule;
      }
    )
  }
}
