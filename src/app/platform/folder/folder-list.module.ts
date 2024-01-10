import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderListRoutingModule } from './folder-list-routing.module';
import { PrimengModule } from 'src/app/primeng.module';
import { FolderNavigationComponent } from './folder-navigation/folder-navigation.component';

@NgModule({
  declarations: [FolderListComponent, FolderNavigationComponent],
  imports: [
    CommonModule,
    FolderListRoutingModule,
    PrimengModule
  ]
})
export class FolderListModule { }
