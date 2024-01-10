import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TryFreeComponent } from './try-free.component';
import { TryFreeRoutingModule } from './try-free-routing.module';
import { PrimengModule } from 'src/app/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TryFreeComponent],
  imports: [
    CommonModule,
    TryFreeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule
  ]
})
export class TryFreeModule { }
