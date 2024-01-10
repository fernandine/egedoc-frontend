import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverSuccessComponent } from './recover-success.component';
import { RecoverSuccessRoutingModule } from './recover-success-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [
    RecoverSuccessComponent
  ],
  imports: [
    CommonModule,
    RecoverSuccessRoutingModule,
    PrimengModule
  ]
})
export class RecoverSuccessModule { }
