import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  users: User[] = [];

  showFolders: boolean = true;
  showDocuments: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.userService.getById(userId).subscribe((user) => {
        this.users = user;
        console.log(user); // Aqui você pode ver todas as informações disponíveis
      });
    }
  }

    toggleComponents(): void {
      this.showFolders = !this.showFolders;
      this.showDocuments = !this.showDocuments;
    }

    addDocument(): void {
      this.showFolders = false;
      this.showDocuments = true;
    }

  }
