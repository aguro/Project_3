import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ISchedule } from '../models/schedule.interface';

const API_URL = environment.BASE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class ScheduleHttpService {

  constructor(private _http: HttpClient) {}

  public getSchedule(): Observable<Object> {
    return this._http.get(`${API_URL}/schedule`);
  }

  public getUserSchedule(userId: any): Observable<Object> {
    return this._http.get(`${API_URL}/schedule/user/${userId}`)
  }

  public addSchedule(schedule: ISchedule): Observable<Object> {
    return this._http.post(`${API_URL}/schedule/new`, schedule)
  }

  public editSchedule(schedule: ISchedule): Observable<Object> {
    return this._http.put(`${API_URL}/schedule/${schedule.schedule_id}`, schedule)
  }

  public deleteSchedule(scheduleId: string): Observable<Object> {
    return this._http.delete(`${API_URL}/schedule/${scheduleId}`)
  }
}
