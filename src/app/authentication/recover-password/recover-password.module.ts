import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverPasswordComponent } from './recover-password.component';
import { RecoverPasswordRoutingModule } from './recover-password-routing.module';


@NgModule({
    imports: [
    CommonModule,
    RecoverPasswordRoutingModule,
    RecoverPasswordComponent
]
})
export class RecoverPasswordModule { }
