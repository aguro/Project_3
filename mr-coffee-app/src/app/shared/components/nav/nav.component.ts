import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDataService } from 'src/app/user/services/user-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public currentURL?: string;

  constructor(private _router: Router, public _authService: AuthService, private _userDataService: UserDataService) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentURL = event.url;
      }
    });
  }

  public ngOnInit(): void {
    this.currentURL = this._router.url;
  }

  public isActive(url: string): boolean {
    return this.currentURL === url;
  }
  
  public logout(): void {
    this._userDataService.logout();
    this._router.navigate(['/login']);
  }

  public getUserId(): number {
    return Number(this._userDataService.userId);
  }

  public get isUserLoggedIn(): boolean {
    return this._authService.isUserLoggedIn;
  }
}
