import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriberListComponent } from './subscriber-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SubscriberListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class SubscriberListRoutingModule { }
