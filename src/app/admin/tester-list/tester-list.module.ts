import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesterListRoutingModule } from './tester-list-routing.module';
import { PrimengModule } from 'src/app/primeng.module';
import { TesterListComponent } from './tester-list.component';

@NgModule({
  declarations: [
    TesterListComponent
  ],
  imports: [
    CommonModule,
    TesterListRoutingModule,
    PrimengModule
  ]
})
export class TesterListModule { }
