import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from './new-password.component';
import { NewPasswordRoutingModule } from './new-password-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    NewPasswordRoutingModule,
    PrimengModule
  ]
})
export class NewPasswordModule { }
