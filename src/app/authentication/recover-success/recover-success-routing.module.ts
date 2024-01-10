import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverSuccessComponent } from './recover-success.component';

const routes: Routes = [
  { path: '', component: RecoverSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class RecoverSuccessRoutingModule { }
