import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesterListComponent } from './tester-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TesterListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class TesterListRoutingModule { }
