import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverSuccessComponent } from './recover-success.component';
import { RecoverSuccessRoutingModule } from './recover-success-routing.module';


@NgModule({
    imports: [
    CommonModule,
    RecoverSuccessRoutingModule,
    RecoverSuccessComponent
]
})
export class RecoverSuccessModule { }
