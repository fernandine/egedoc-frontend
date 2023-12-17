import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SolutionsComponent } from './components/solutions/solutions.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { TryFreeComponent } from './components/try-free/try-free.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { ConfirmationTesterComponent } from './components/confirmation-tester/confirmation-tester.component';
import { LoginComponent } from './authentication/login/login.component';
import { PainelComponent } from './admin/painel/painel.component';
import { TrilhaComponent } from './components/trilha/trilha.component';
import { PartnersComponent } from './components/partners/partners.component';
import { PlansComponent } from './components/plans/plans.component';
import { PlansPricesComponent } from './components/plans-prices/plans-prices.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { PortalComponent } from './components/portal/portal.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
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
  { path: 'signin-admin', component: LoginComponent },
  { path: 'painel-admin', component: PainelComponent },
  { path: 'portal', component: PortalComponent },
  { path: 'planos', component: PlansPricesComponent },
  { path: 'parceiros', component: PartnersComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
