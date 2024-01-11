import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionsComponent } from './solutions.component';
import { SolutionsRoutingModule } from './solutions-routing.module';


@NgModule({
    imports: [
    CommonModule,
    SolutionsRoutingModule,
    SolutionsComponent
]
})
export class SolutionsModule { }
