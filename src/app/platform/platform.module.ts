import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FolderListComponent } from './folder-list/folder-list.component';
import { InsertDocumentComponent } from './insert-document/insert-document.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentPropertiesComponent } from './document-properties/document-properties.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FolderListComponent,
    InsertDocumentComponent,
    DocumentPropertiesComponent,

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
  ],
  providers: [ConfirmationService, MessageService]
})
export class PlatformModule { }
