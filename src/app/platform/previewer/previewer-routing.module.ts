import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewerComponent } from './previewer.component';

const routes: Routes = [
  // { path: ':fileUri', component: PreviewerComponent },
   { path: '', component: PreviewerComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class PreviewerRoutingModule { }
