import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { PlansRoutingModule } from './plans-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [PlansComponent],
  imports: [
    CommonModule,
    PlansRoutingModule,
    PrimengModule
  ]
})
export class PlansModule { }
