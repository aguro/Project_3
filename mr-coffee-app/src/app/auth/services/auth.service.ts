import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
    this.getUserFromStorage();
  }

  public getUserFromStorage(): void {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      try {
        const currentUserObject = JSON.parse(currentUser);
        if (currentUserObject && typeof currentUserObject === 'object') {
          this.currentUserSubject.next(currentUserObject);
        } else {
          console.error('Invalid user object in local storage.');
          this.currentUserSubject.next(null);
        }
      } catch (error) {
        console.error('Error parsing user object from local storage:', error);
        this.currentUserSubject.next(null);
      }
    } else {
      this.currentUserSubject.next(null);
    }
  }

  public get isUserLoggedIn(): boolean {
    return this.currentUserSubject.value ? true : false;
  }

  public get userId(): number {
    return this.currentUserSubject.value.user_id;
  }
}
