import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelRoutingModule } from './painel-routing.module';

import { PainelComponent } from './painel.component';
import { TesterListComponent } from '../tester-list/tester-list.component';
import { SubscriberListComponent } from '../subscriber-list/subscriber-list.component';



@NgModule({
    imports: [
    CommonModule,
    PainelRoutingModule,
    PainelComponent,
    TesterListComponent,
    SubscriberListComponent
]
})
export class PainelModule { }
