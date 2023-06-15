import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../models/user.interface';
import { UserDataService } from '../../services/user-data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  @Input() user!: IUser;
  public editDataForm!: FormGroup;

  constructor(private _userDataService: UserDataService) { }

  public ngOnInit(): void {
    this.editDataForm = new FormGroup({
      firstname: new FormControl(this.user.firstname),
      lastname: new FormControl(this.user.lastname)
    });
  }

  public editUserData(): void {
    this._userDataService.editUserData(this.user);
  }
}
