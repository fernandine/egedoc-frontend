import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrilhaComponent } from './trilha.component';
import { TrilhaRoutingModule } from './trilha-routing.module';


@NgModule({
    imports: [
    CommonModule,
    TrilhaRoutingModule,
    TrilhaComponent
]
})
export class TrilhaModule { }
