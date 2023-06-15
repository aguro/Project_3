import { Component, Input, OnInit } from '@angular/core';
import { ISchedule } from '../../models/schedule.interface';
import { ScheduleDataService } from '../../services/schedule-data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-schedule-modal',
  templateUrl: './add-schedule-modal.component.html',
  styleUrls: ['./add-schedule-modal.component.scss']
})
export class AddScheduleModalComponent implements OnInit {
  @Input() modalId!: string;
  public userList$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public schedule!: ISchedule;

  constructor(private _scheduleDataService: ScheduleDataService) {
    this.schedule = {
      user_id: '',
      date: '',
      start_at: '',
      end_at: ''
    };
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  public addSchedule(): void {
    this._scheduleDataService.addSchedule(this.schedule);
  }
  
  private getUsers(): void {
    this.userList$ = this._scheduleDataService.userList$;
  }
}
