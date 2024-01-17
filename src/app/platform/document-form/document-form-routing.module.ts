import { NgModule } from '@angular/core';
import { DocumentFormComponent } from './document-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DocumentFormComponent },
  { path: ':id', component: DocumentFormComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class DocumentFormRoutingModule { }
