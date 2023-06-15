import { Injectable } from '@angular/core';
import { UserHttpService } from './user-http.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public message: string = '';
  public userId: string = '';
  public auth: boolean = false;

  constructor(private _userHttpService: UserHttpService, private _router: Router, private _toastrService: ToastrService, private _authService: AuthService) { }

  public signup(user: any): any {
    return this._userHttpService.signup(user).subscribe(
      (response) => {
        this._toastrService.success(response.message);
        this._router.navigate(['/login'])
      },
      (error) => {
        if (error.status === 500) {
          this.message = 'Error! User already exists.';
          this._toastrService.error(this.message);
        } else {
          this.message = 'Error! User not created.';
          this._toastrService.error(error.message);
        }
      }
    );
  }

  public login(email: string, password: string): any {
    return this._userHttpService.login(email, password).subscribe(
      (response) => {
        this._toastrService.success(response.message);
        this._router.navigate(['/schedule']);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this._authService.currentUserSubject.next(response);
        this.userId = response.user_id;
        this.auth = true;
      },
      (error) => {
        this._toastrService.error(error.error.message);
      }
    );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this._authService.currentUserSubject.next(null);
  }

  public getUsers(): Observable<any> {
    return this._userHttpService.getUsers();
  }

  public getUser(userId: number): Observable<any> {
    return this._userHttpService.getUser(userId);
  }

  public editUserData(user: IUser): any {
    return this._userHttpService.editUserData(user).subscribe(
      (response: any) => {
        this._toastrService.success(response.message);
      },
      (error) => {
        this._toastrService.error(error.error.message);
      }
    );
  }

  public editUserPassword(user: IUser, currentPassword: string, newPassword: string): any {
    return this._userHttpService.editUserPassword(user, currentPassword, newPassword).subscribe(
      (response: any) => {
        this._toastrService.success(response.message);
      },
      (error) => {
        this._toastrService.error(error.error.message);
      }
    );
  }

  public deleteUser(user: IUser): any {
    return this._userHttpService.deleteUser(user).subscribe(
      (response: any) => {
        this._toastrService.success(response.message);
        this.logout();
        this._router.navigate(['/login']);
        location.reload();
      },
      (error) => {
        this._toastrService.error(error.error.message);
      }
    )
  }
}
