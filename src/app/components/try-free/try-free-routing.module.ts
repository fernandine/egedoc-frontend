import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TryFreeComponent } from './try-free.component';

const routes: Routes = [
  { path: '', component: TryFreeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class TryFreeRoutingModule { }
