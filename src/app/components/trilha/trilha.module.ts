import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrilhaComponent } from './trilha.component';
import { TrilhaRoutingModule } from './trilha-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [TrilhaComponent],
  imports: [
    CommonModule,
    TrilhaRoutingModule,
    PrimengModule
  ]
})
export class TrilhaModule { }
