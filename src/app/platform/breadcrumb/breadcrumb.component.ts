import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Folder } from 'src/app/common/folder';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() items: MenuItem[] = [];

  home: MenuItem | undefined;

  ngOnInit() {

      this.home = { icon: 'pi pi-home', routerLink: '/folders' };
  }

}
