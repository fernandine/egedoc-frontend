import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansPricesComponent } from './plans-prices.component';
import { PlansPricesRoutingModule } from './plans-prices-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [PlansPricesComponent],
  imports: [
    CommonModule,
    PlansPricesRoutingModule,
    PrimengModule
  ]
})
export class PlansPricesModule { }
