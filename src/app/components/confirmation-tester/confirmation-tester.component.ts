import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-confirmation-tester',
    templateUrl: './confirmation-tester.component.html',
    styleUrls: ['./confirmation-tester.component.scss'],
    standalone: true,
    imports: [ButtonModule, RouterLink]
})
export class ConfirmationTesterComponent {

}
