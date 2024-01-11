import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page.component';

import { AboutRoutingModule } from './about-routing.module';

@NgModule({
    imports: [
    CommonModule,
    AboutRoutingModule,
    AboutPageComponent
]
})
export class AboutPageModule { }
