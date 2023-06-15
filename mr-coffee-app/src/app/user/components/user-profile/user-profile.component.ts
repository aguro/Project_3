import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { IUser } from '../../models/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user?: IUser;

  constructor(private _userDataService: UserDataService, private _authService: AuthService ) {}

  public ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    const userId = this._authService.userId;;
    this._userDataService.getUser(userId).subscribe(
      (response: any) => {
        this.user = response;
      }
    );
  }
}
