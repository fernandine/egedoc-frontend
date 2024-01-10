import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbRoutingModule } from './breadcrumb-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    BreadcrumbRoutingModule,
    PrimengModule
  ]
})
export class BreadcrumbModule { }
