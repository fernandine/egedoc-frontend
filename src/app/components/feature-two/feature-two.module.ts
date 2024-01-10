import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureTwoComponent } from './feature-two.component';
import { FeatureTwoRoutingModule } from './feature-two-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [
    FeatureTwoComponent
  ],
  imports: [
    CommonModule,
    FeatureTwoRoutingModule,
    PrimengModule
  ]
})
export class FeatureTwoModule { }
