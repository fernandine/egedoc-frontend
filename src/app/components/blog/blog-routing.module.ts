import { NgModule } from '@angular/core';
import { BlogComponent } from './blog.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BlogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class BlogRoutingModule { }
