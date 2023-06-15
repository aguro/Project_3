import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

const API_URL = environment.BASE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  public signup(user: IUser): Observable<any> {
    return this._http.post(`${API_URL}/signup`, user);
  }

  public login(email: string, password: string): Observable<any>  {
    return this._http.post(`${API_URL}/login`, { email, password });
  }

  public getUsers(): Observable<Object> {
    return this._http.get<any>(`${API_URL}/users`);
  }

  public getUser(userId: number): Observable<Object> {
    return this._http.get<any>(`${API_URL}/user/${userId}`);
  }

  public editUserData(user: IUser): Observable<Object> {
    return this._http.put(`${API_URL}/user/${user.user_id}`, user)
  }

  public editUserPassword(user: IUser, currentPassword: string, newPassword: string): Observable<any> {
    return this._http.put(`${API_URL}/user/${user.user_id}/password`, {currentPassword, newPassword})
  }

  public deleteUser(user: IUser): Observable<any> {
    return this._http.delete(`${API_URL}/user/${user.user_id}`)
  }
}
