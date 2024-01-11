import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-vacancies',
    templateUrl: './vacancies.component.html',
    styleUrls: ['./vacancies.component.scss'],
    standalone: true,
    imports: [ButtonModule, RippleModule]
})
export class VacanciesComponent {

}
