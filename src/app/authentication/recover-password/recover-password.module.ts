import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverPasswordComponent } from './recover-password.component';
import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    RecoverPasswordRoutingModule,
    PrimengModule
  ]
})
export class RecoverPasswordModule { }
