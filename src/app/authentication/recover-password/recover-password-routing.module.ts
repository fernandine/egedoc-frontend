import { NgModule } from '@angular/core';
import { RecoverPasswordComponent } from './recover-password.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RecoverPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class RecoverPasswordRoutingModule { }
