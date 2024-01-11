import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationTesterComponent } from './confirmation-tester.component';
import { ConfirmationTesterRoutingModule } from './confirmation-tester-routing.module';


@NgModule({
    imports: [
    CommonModule,
    ConfirmationTesterRoutingModule,
    ConfirmationTesterComponent
]
})
export class ConfirmationTesterModule { }
