import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './platform/dashboard/dashboard.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./components/component.module').then(m => m.ComponentModule)
  },

  //########## PLATAFORMA ################

  { path: 'dashboard', component: DashboardComponent },
  { path: 'documents/:folderId', component: DashboardComponent },
  { path: '**', redirectTo: 'home' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
