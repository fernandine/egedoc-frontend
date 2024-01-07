import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FolderListComponent } from './folder-list/folder-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DocumentPropertiesComponent } from './document-properties/document-properties.component';
import { DocumentFormComponent } from './document-form/document-form.component';
import { FolderNavigationComponent } from './folder-navigation/folder-navigation.component';
import { HeaderPlatformComponent } from './header-platform/header-platform.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DocumentListComponent } from './document-list/document-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FolderListComponent,
    DocumentPropertiesComponent,
    DocumentFormComponent,
    FolderNavigationComponent,
    HeaderPlatformComponent,
    BreadcrumbComponent,
    DocumentListComponent,

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
