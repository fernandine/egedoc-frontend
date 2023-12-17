import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RecoverSuccessComponent } from './recover-success/recover-success.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng.module';
import { NotificationService } from '../services/notification.service';

@NgModule({
  declarations: [
    LoginComponent,
    NewPasswordComponent,
    RecoverPasswordComponent,
    RecoverSuccessComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule
  ],
  providers: [NotificationService]
})
export class AuthModule { }
