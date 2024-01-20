import { NgModule } from '@angular/core';
import { DocumentFormComponent } from './document-form/document-form.component';
import { RouterModule, Routes } from '@angular/router';
import { DocumentPropertiesComponent } from './document-properties/document-properties.component';

const routes: Routes = [
  { path: '', component: DocumentPropertiesComponent },
  { path: ':id', component: DocumentPropertiesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class DocumentFormRoutingModule { }
