import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureOneComponent } from './feature-one.component';
import { FeatureOneRoutingModule } from './feature-one-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [
    FeatureOneComponent
  ],
  imports: [
    CommonModule,
    FeatureOneRoutingModule,
    PrimengModule
  ]
})
export class FeatureOneModule { }
