import { Component, Input } from '@angular/core';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-access-list-modal',
  templateUrl: './access-list-modal.component.html',
  styleUrls: ['./access-list-modal.component.scss']
})
export class AccessListModalComponent {

  users: User[] = [];
  visible: boolean = false;

}
