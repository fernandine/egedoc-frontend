import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationTesterComponent } from './confirmation-tester.component';
import { ConfirmationTesterRoutingModule } from './confirmation-tester-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [
    ConfirmationTesterComponent
  ],
  imports: [
    CommonModule,
    ConfirmationTesterRoutingModule,
    PrimengModule
  ]
})
export class ConfirmationTesterModule { }
