import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderListRoutingModule } from './folder-list-routing.module';

import { FolderNavigationComponent } from './folder-navigation/folder-navigation.component';

@NgModule({
    imports: [
    CommonModule,
    FolderListRoutingModule,
    FolderListComponent, FolderNavigationComponent
]
})
export class FolderListModule { }
