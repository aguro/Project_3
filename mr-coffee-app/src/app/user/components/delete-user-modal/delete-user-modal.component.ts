import { Component, Input } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent {
  
  @Input() user!: IUser;
  @Input() modalId!: string;

  constructor(private _userDataService: UserDataService){}

  public deleteUser(): void {
    this._userDataService.deleteUser(this.user);
  }
}
