import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelComponent } from '../admin/painel/painel.component';
import { PortalComponent } from '../authentication/portal/portal.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { BlogComponent } from './blog/blog.component';
import { ConfirmationTesterComponent } from './confirmation-tester/confirmation-tester.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { HomeComponent } from './home/home.component';
import { PartnersComponent } from './partners/partners.component';
import { PlansPricesComponent } from './plans-prices/plans-prices.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { TrilhaComponent } from './trilha/trilha.component';
import { TryFreeComponent } from './try-free/try-free.component';
import { VacanciesComponent } from './vacancies/vacancies.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'quem-somos', component: AboutPageComponent },
  { path: 'solucoes', component: SolutionsComponent },
  { path: 'contato', component: CustomerServiceComponent },
  { path: 'trabalhe-conosco', component: VacanciesComponent },
  { path: 'novidades', component: SolutionsComponent },
  { path: 'politica-privacidade', component: SolutionsComponent },
  { path: 'trilha-egedoc', component: TrilhaComponent },
  { path: 'experimente', component: TryFreeComponent },
  { path: 'confirmacao', component: ConfirmationTesterComponent },
  { path: 'painel-admin', component: PainelComponent },
  { path: 'portal', component: PortalComponent },
  { path: 'planos', component: PlansPricesComponent },
  { path: 'parceiros', component: PartnersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
