import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersComponent } from './partners.component';
import { PartnersRoutingModule } from './partners-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [PartnersComponent],
  imports: [
    CommonModule,
    PartnersRoutingModule,
    PrimengModule
  ]
})
export class PartnersModule { }
