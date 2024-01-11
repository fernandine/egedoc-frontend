import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentPropertiesComponent } from './document-properties.component';
import { DocumentPropertiesRoutingModule } from './document-properties-routing.module';
import { DocumentFormComponent } from '../document-form/document-form.component';

@NgModule({
  declarations: [DocumentPropertiesComponent, DocumentFormComponent],
  imports: [
    CommonModule,
    DocumentPropertiesRoutingModule,

  ]
})
export class DocumentPropertiesModule { }
