import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.scss']
})
export class EditPasswordModalComponent implements OnInit {
  @Input() user!: IUser;
  public editPasswordForm!: FormGroup;
  public invalidPassword: string = 'Invalid password format (must contain at least 6 characters, including uppercase, lowercase, and numbers).';
  public invalidConfirmPassword: string = 'Passwords are different';

  constructor(private _userDataService: UserDataService) { }

  public ngOnInit(): void {
    const RegPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    this.editPasswordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(RegPassword)])
    });
  }

  public editUserPassword(): void {
    if (this.editPasswordForm.valid) {
      const currentPassword = this.editPasswordForm.value.currentPassword;
      const newPassword = this.editPasswordForm.value.newPassword;
      this._userDataService.editUserPassword(this.user, currentPassword, newPassword);
    }
  }
}
