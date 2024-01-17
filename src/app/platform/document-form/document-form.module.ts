import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
