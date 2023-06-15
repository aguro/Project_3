import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  public invalidEmail: string = 'Invalid email format.';
  public invalidPassword: string = 'Invalid password format (must contain at least 6 characters, including uppercase, lowercase and numbers).';
  public invalidConfirmPassword: string = 'Passwords are different';

  constructor(private _userDataService: UserDataService, private _fb: FormBuilder) { }

  public ngOnInit(): void {
    const RegEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]{2,6}$/;
    const RegPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  
    this.signupForm = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(RegEmail)]],
      firstname: [''],
      lastname: [''],
      password: ['', [Validators.required, Validators.pattern(RegPassword)]]
    });
  }  

  public onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }
    const user = this.signupForm.value;
    this._userDataService.signup(user);
  }
}
