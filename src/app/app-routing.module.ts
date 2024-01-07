import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DocumentPropertiesComponent } from './platform/document-properties/document-properties.component';
import { FolderNavigationComponent } from './platform/folder-navigation/folder-navigation.component';
import { FolderListComponent } from './platform/folder-list/folder-list.component';
import { DocumentListComponent } from './platform/document-list/document-list.component';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./components/component.module').then(m => m.ComponentModule)
  },

  //########## PLATAFORMA ################

    { path: 'folders', component: FolderListComponent },
    { path: 'folders/:id', component: FolderNavigationComponent },
    { path: 'documents', component: DocumentListComponent },
    { path: 'documents/:id', component: DocumentListComponent },
    { path: 'properties', component: DocumentPropertiesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
