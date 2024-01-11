import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { NewsletterComponent } from '../newsletter/newsletter.component';
import { PlansComponent } from '../plans/plans.component';
import { FeatureTwoComponent } from '../feature-two/feature-two.component';
import { FeatureOneComponent } from '../feature-one/feature-one.component';
import { HeroComponent } from '../hero/hero.component';

@NgModule({
    imports: [
    CommonModule,
    HomeRoutingModule,
    HomeComponent,
    NewsletterComponent,
    PlansComponent,
    FeatureOneComponent,
    FeatureTwoComponent,
    HeroComponent
]
})
export class HomeModule { }
