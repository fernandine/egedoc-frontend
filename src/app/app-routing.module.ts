import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './platform/dashboard/dashboard.component';
import { InsertDocumentComponent } from './platform/insert-document/insert-document.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./components/component.module').then(m => m.ComponentModule)
  },

  //########## PLATAFORMA ################

  { path: 'dashboard', component: DashboardComponent },
  { path: 'upload-documento/:folderId', component: InsertDocumentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
