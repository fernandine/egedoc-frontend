import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerServiceComponent } from './customer-service.component';
import { CustomerServiceRoutingModule } from './customer-service-routing.module';
import { PrimengModule } from 'src/app/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomerServiceComponent
  ],
  imports: [
    CommonModule,
    CustomerServiceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule
  ]
})
export class CustomerServiceModule { }
