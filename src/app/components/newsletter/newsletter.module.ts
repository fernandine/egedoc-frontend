import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from './newsletter.component';
import { NewsletterRoutingModule } from './newsletter-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NewsletterRoutingModule,
    NewsletterComponent
  ]
})
export class NewsletterModule { }
