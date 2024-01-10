import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionsComponent } from './solutions.component';
import { SolutionsRoutingModule } from './solutions-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [SolutionsComponent],
  imports: [
    CommonModule,
    SolutionsRoutingModule,
    PrimengModule
  ]
})
export class SolutionsModule { }
