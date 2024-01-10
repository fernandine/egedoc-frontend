import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page.component';
import { PrimengModule } from 'src/app/primeng.module';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [
    AboutPageComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    PrimengModule
  ]
})
export class AboutPageModule { }
