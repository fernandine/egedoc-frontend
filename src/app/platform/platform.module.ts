import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FolderListComponent } from './folder-list/folder-list.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentFormComponent } from './document-form/document-form.component';
import { FolderFormComponent } from './folder-form/folder-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FolderListComponent,
    DocumentListComponent,
    DocumentFormComponent,
    FolderFormComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    PrimengModule
  ]
})
export class PlatformModule { }
