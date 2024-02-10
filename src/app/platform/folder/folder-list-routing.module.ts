import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderNavigationComponent } from './folder-navigation/folder-navigation.component';

const routes: Routes = [
{path: '', component: FolderListComponent},
  {
    path: ':id',
    component: FolderNavigationComponent,
    children: [
      {
        path: ':id',
        component: FolderNavigationComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FolderListRoutingModule { }
