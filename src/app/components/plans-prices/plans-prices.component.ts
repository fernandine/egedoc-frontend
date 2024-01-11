import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-plans-prices',
    templateUrl: './plans-prices.component.html',
    styleUrls: ['./plans-prices.component.scss'],
    standalone: true,
    imports: [ButtonModule, RippleModule]
})
export class PlansPricesComponent {

}
