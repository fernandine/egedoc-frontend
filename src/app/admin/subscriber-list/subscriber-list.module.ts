import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriberListComponent } from './subscriber-list.component';
import { SubscriberListRoutingModule } from './subscriber-list-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [
    SubscriberListComponent
  ],
  imports: [
    CommonModule,
    SubscriberListRoutingModule,
    PrimengModule
  ]
})
export class SubscriberListModule { }
