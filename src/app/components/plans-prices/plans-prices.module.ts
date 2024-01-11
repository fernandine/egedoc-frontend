import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansPricesComponent } from './plans-prices.component';
import { PlansPricesRoutingModule } from './plans-prices-routing.module';


@NgModule({
    imports: [
    CommonModule,
    PlansPricesRoutingModule,
    PlansPricesComponent
]
})
export class PlansPricesModule { }
