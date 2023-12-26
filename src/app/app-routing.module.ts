import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './platform/dashboard/dashboard.component';
import { DocumentPropertiesComponent } from './platform/document-properties/document-properties.component';
import { FolderListComponent } from './platform/folder-list/folder-list.component';
import { InsertDocumentComponent } from './platform/insert-document/insert-document.component';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./components/component.module').then(m => m.ComponentModule)
  },

  //########## PLATAFORMA ################

  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'folders', component: FolderListComponent },
    { path: 'folders/:id', component: InsertDocumentComponent },
    { path: 'properties', component: DocumentPropertiesComponent },
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
