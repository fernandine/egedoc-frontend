import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PortalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class PortalRoutingModule { }
