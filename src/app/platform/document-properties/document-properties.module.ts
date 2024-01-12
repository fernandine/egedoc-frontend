import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentPropertiesComponent } from './document-properties.component';
import { DocumentPropertiesRoutingModule } from './document-properties-routing.module';
import { DocumentFormComponent } from '../document-form/document-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DocumentPropertiesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DocumentPropertiesModule { }
