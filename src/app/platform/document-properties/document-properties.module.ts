import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentPropertiesComponent } from './document-properties.component';
import { DocumentPropertiesRoutingModule } from './document-properties-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [DocumentPropertiesComponent],
  imports: [
    CommonModule,
    DocumentPropertiesRoutingModule,
    PrimengModule
  ]
})
export class DocumentPropertiesModule { }
