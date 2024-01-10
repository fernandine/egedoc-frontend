import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionalitiesComponent } from './functionalities.component';

const routes: Routes = [
  { path: '', component: FunctionalitiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class FunctionalitiesRoutingModule { }
