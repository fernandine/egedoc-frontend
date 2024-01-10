import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationTesterComponent } from './confirmation-tester.component';

const routes: Routes = [
  { path: '', component: ConfirmationTesterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class ConfirmationTesterRoutingModule { }
