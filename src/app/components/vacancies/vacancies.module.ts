import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesComponent } from './vacancies.component';
import { VacanciesRoutingModule } from './vacancies-routing.module';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  declarations: [VacanciesComponent],
  imports: [
    CommonModule,
    VacanciesRoutingModule,
    PrimengModule
  ]
})
export class VacanciesModule { }
