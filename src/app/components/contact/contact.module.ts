import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ContactRoutingModule,
    ContactComponent
]
})
export class ContactModule { }
