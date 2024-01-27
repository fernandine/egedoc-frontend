import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderFavoriteComponent } from './folder-favorite.component';

const routes: Routes = [
  {path: '', component: FolderFavoriteComponent},
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FolderFavoriteRoutingModule { }
