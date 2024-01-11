import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TryFreeComponent } from './try-free.component';
import { TryFreeRoutingModule } from './try-free-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
    CommonModule,
    TryFreeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TryFreeComponent
]
})
export class TryFreeModule { }
