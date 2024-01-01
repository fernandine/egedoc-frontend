import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './platform/dashboard/dashboard.component';
import { DocumentPropertiesComponent } from './platform/document-properties/document-properties.component';
import { FolderNavigationComponent } from './platform/folder-navigation/folder-navigation.component';
import { FolderListComponent } from './platform/folder-list/folder-list.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderPlatformComponent } from './platform/header-platform/header-platform.component';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./components/component.module').then(m => m.ComponentModule)
  },

  //########## PLATAFORMA ################

    { path: 'folders', component: FolderListComponent },
    { path: 'folders/:id', component: FolderNavigationComponent },
    { path: 'properties', component: DocumentPropertiesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
