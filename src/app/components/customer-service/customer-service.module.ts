import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerServiceComponent } from './customer-service.component';
import { CustomerServiceRoutingModule } from './customer-service-routing.module';
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

  ]
})
export class CustomerServiceModule { }
