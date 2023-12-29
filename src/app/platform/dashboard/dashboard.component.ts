import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Folder } from 'src/app/common/folder';
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
  showProperties: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.toggleComponents();
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getById(userId).subscribe((user) => {
        this.users = user;
      });
    }
  }

  toggleComponents(): void {
    this.showFolders = true;
    this.showDocuments = false;
    this.showProperties = false;
  }

  addDocument(folder: Folder): void {
    this.router.navigate(['folders', folder.id]);
    this.showFolders = false;
    this.showDocuments = true;
    this.showProperties = false;
  }

  addProperties(): void {
    this.router.navigate(['properties'], { relativeTo: this.route });
    this.showFolders = false;
    this.showDocuments = false;
    this.showProperties = true;
  }
}
