import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelRoutingModule } from './painel-routing.module';
import { PrimengModule } from 'src/app/primeng.module';
import { PainelComponent } from './painel.component';
import { TesterListComponent } from '../tester-list/tester-list.component';
import { SubscriberListComponent } from '../subscriber-list/subscriber-list.component';



@NgModule({
  declarations: [
    PainelComponent,
    TesterListComponent,
    SubscriberListComponent
  ],
  imports: [
    CommonModule,
    PainelRoutingModule,
    PrimengModule
  ]
})
export class PainelModule { }
