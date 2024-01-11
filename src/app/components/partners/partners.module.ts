import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersComponent } from './partners.component';
import { PartnersRoutingModule } from './partners-routing.module';


@NgModule({
    imports: [
    CommonModule,
    PartnersRoutingModule,
    PartnersComponent
]
})
export class PartnersModule { }
