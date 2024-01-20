import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ChipsModule } from 'primeng/chips';
import { DocumentFormComponent } from '../document-form/document-form.component';

@Component({
  selector: 'app-document-properties',
  templateUrl: './document-properties.component.html',
  styleUrls: ['./document-properties.component.scss'],
  standalone: true,
  imports: [TabViewModule, ChipsModule, TabViewModule, DocumentFormComponent ]
})
export class DocumentPropertiesComponent {


}
