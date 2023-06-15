import { Component } from '@angular/core';
import { ScheduleDataService } from '../../services/schedule-data.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-schedule',
  templateUrl: './user-schedule.component.html',
  styleUrls: ['./user-schedule.component.scss']
})
export class UserScheduleComponent {
  public schedule!: any;

  constructor(private _scheduleDataService: ScheduleDataService, private _authService: AuthService) { }

  public ngOnInit(): void {
    this.getSchedule();
  }

  public getUserFullName(userId: string): string {
    return this._scheduleDataService.getUserFullName(userId);
  }

  private getSchedule(): void {
    const userId = this._authService.userId;;
    this._scheduleDataService.getUserSchedule(userId).subscribe(
      (schedule) => {
        this.schedule = schedule;
      }
    )
  }
}
