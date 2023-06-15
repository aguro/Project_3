import { Component, Input } from '@angular/core';
import { ScheduleDataService } from '../../services/schedule-data.service';

@Component({
  selector: 'app-delete-schedule-modal',
  templateUrl: './delete-schedule-modal.component.html',
  styleUrls: ['./delete-schedule-modal.component.scss']
})
export class DeleteScheduleModalComponent {

  @Input() scheduleId!: string;
  @Input() modalId!: string;

  constructor(private _scheduleDataService: ScheduleDataService){}

  public deleteSchedule(): void {
    this._scheduleDataService.deleteSchedule(this.scheduleId);
  }
}
