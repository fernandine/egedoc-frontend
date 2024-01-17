import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() fullPath: string = '';

  ngOnInit() {
    this.getBreadcrumbItems();
  }
  getBreadcrumbItems(): string[] {
    let items: string[] = this.fullPath ? this.fullPath.split('>') : [];

    items = ['<i class="pi pi-home"></i>'].concat(items);

    return items;
  }

}


