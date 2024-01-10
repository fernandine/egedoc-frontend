import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentPropertiesComponent } from './document-properties.component';

const routes: Routes = [
  { path: '', component: DocumentPropertiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class DocumentPropertiesRoutingModule { }
