import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from './newsletter.component';
import { NewsletterRoutingModule } from './newsletter-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [NewsletterComponent],
  imports: [
    CommonModule,
    NewsletterRoutingModule,
    PrimengModule
  ]
})
export class NewsletterModule { }
