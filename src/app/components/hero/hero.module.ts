import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import { HeroRoutingModule } from './hero-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [
    HeroComponent
  ],
  imports: [
    CommonModule,
    HeroRoutingModule,
    PrimengModule
  ]
})
export class HeroModule { }
