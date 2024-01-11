import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from './new-password.component';
import { NewPasswordRoutingModule } from './new-password-routing.module';


@NgModule({
    imports: [
    CommonModule,
    NewPasswordRoutingModule,
    NewPasswordComponent
]
})
export class NewPasswordModule { }
