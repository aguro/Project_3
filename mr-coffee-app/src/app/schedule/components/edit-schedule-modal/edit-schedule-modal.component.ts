import { Component, Input } from '@angular/core';
import { ScheduleDataService } from '../../services/schedule-data.service';
import { ISchedule } from '../../models/schedule.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-schedule-modal',
  templateUrl: './edit-schedule-modal.component.html',
  styleUrls: ['./edit-schedule-modal.component.scss']
})
export class EditScheduleModalComponent {
  @Input() schedule!: ISchedule;
  @Input() modalId!: string;
  public userList$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _scheduleDataService: ScheduleDataService){
    this.getUsers();
  }

  public editSchedule(): void {
    this._scheduleDataService.editSchedule(this.schedule);
  }

  private getUsers(): void {
    this.userList$ = this._scheduleDataService.userList$;
  }
}
