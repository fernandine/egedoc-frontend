import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentFormComponent } from './document-form.component';
import { DocumentFormRoutingModule } from './document-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DocumentFormRoutingModule,

  ]
})
export class DocumentFormModule { }
