import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { PainelComponent } from './painel/painel.component';
import { TesterListComponent } from './tester-list/tester-list.component';
import { SubscriberListComponent } from './subscriber-list/subscriber-list.component';

@NgModule({
  declarations: [
    PainelComponent,
    TesterListComponent,
    SubscriberListComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    PrimengModule
  ]
})
export class AdminModule { }
