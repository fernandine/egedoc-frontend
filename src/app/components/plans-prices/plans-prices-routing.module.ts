import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansPricesComponent } from './plans-prices.component';

const routes: Routes = [
  { path: '', component: PlansPricesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class PlansPricesRoutingModule { }
