import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { PrimengModule } from 'src/app/primeng.module';
import { BlogRoutingModule } from './blog-routing.module';



@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    PrimengModule
  ]
})
export class BlogModule { }
