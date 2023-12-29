import { Component } from '@angular/core';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-header-platform',
  templateUrl: './header-platform.component.html',
  styleUrls: ['./header-platform.component.scss']
})
export class HeaderPlatformComponent {
users!: User[];
}
