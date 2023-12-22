import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PrimengModule } from '../primeng.module';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ConfirmationTesterComponent } from './confirmation-tester/confirmation-tester.component';
import { ContactComponent } from './contact/contact.component';
import { FeatureOneComponent } from './feature-one/feature-one.component';
import { FeatureTwoComponent } from './feature-two/feature-two.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { PartnersComponent } from './partners/partners.component';
import { PlansComponent } from './plans/plans.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { TrilhaComponent } from './trilha/trilha.component';
import { TryFreeComponent } from './try-free/try-free.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { PlansPricesComponent } from './plans-prices/plans-prices.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ComponentRoutingModule } from './component-routing.module';

@NgModule({
  declarations: [
    TryFreeComponent,
    SolutionsComponent,
    HomeComponent,
    VacanciesComponent,
    ContactComponent,
    HeroComponent,
    BlogComponent,
    AboutComponent,
    ConfirmationTesterComponent,
    TrilhaComponent,
    NewsletterComponent,
    PlansPricesComponent,
    HeaderComponent,
    FooterComponent,
    FeatureOneComponent,
    FeatureTwoComponent,
    PlansComponent,
    PartnersComponent,
    CustomerServiceComponent,
    AboutPageComponent,

  ],
  imports: [
    CommonModule,
    PrimengModule,
    ComponentRoutingModule,
    ReactiveFormsModule,
    ToastModule
  ],

})
export class ComponentModule { }
