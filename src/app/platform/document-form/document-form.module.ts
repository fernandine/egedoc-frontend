import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentFormComponent } from './document-form.component';
import { DocumentFormRoutingModule } from './document-form-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [DocumentFormComponent],
  imports: [
    CommonModule,
    DocumentFormRoutingModule,
    PrimengModule
  ]
})
export class DocumentFormModule { }
