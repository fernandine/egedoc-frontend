import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimengModule } from './primeng.module';
import { HeaderComponent } from './shared/layout/header-site/header.component';
import { HeaderPlatformComponent } from './shared/layout/header-platform/header-platform.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderService } from './services/header.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderPlatformComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PrimengModule,
  ],
  providers: [ConfirmationService, MessageService, HeaderService],
  bootstrap: [AppComponent],
})
export class AppModule { }
