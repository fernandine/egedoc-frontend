import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionalitiesComponent } from './functionalities.component';
import { FunctionalitiesRoutingModule } from './functionalities-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [
    FunctionalitiesComponent
  ],
  imports: [
    CommonModule,
    FunctionalitiesRoutingModule,
    PrimengModule
  ]
})
export class FunctionalitiesModule { }
