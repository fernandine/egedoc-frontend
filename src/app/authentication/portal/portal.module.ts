import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { PortalRoutingModule } from './portal-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PortalRoutingModule,
    PortalComponent
]
})
export class PortalModule { }
