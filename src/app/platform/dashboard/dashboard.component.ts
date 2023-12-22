import { Component, ViewChild } from '@angular/core';
import { InsertDocumentComponent } from '../insert-document/insert-document.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showInsertDocument: boolean = false;

  @ViewChild('insertDocument') insertDocument!: InsertDocumentComponent;

  addDocument(): void {
    this.showInsertDocument = true;

  }

}
