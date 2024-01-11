import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import { HeroRoutingModule } from './hero-routing.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HeroRoutingModule,
    HeroComponent
  ]
})
export class HeroModule { }
