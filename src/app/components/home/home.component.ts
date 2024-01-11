import { Component } from '@angular/core';
import { NewsletterComponent } from '../newsletter/newsletter.component';
import { PlansComponent } from '../plans/plans.component';
import { FeatureTwoComponent } from '../feature-two/feature-two.component';
import { FeatureOneComponent } from '../feature-one/feature-one.component';
import { HeroComponent } from '../hero/hero.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HeroComponent, FeatureOneComponent, FeatureTwoComponent, PlansComponent, NewsletterComponent]
})
export class HomeComponent {

}
