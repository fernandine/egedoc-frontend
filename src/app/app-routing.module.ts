import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [

  // ########## AUTHENTICATION ###########

  { path: 'auth-login', loadChildren: () => import('./authentication/portal/portal.module').then(m => m.PortalModule) },
  { path: 'nova-senha', loadChildren: () => import('./authentication/new-password/new-password.module').then(m => m.NewPasswordModule) },
  { path: 'recuperar-senha', loadChildren: () => import('./authentication/recover-password/recover-password.module').then(m => m.RecoverPasswordModule) },
  { path: 'senha-sucesso', loadChildren: () => import('./authentication/recover-success/recover-success.module').then(m => m.RecoverSuccessModule) },

  // ########## WEBSITE ###########

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'quem-somos', loadChildren: () => import('./components/about-page/about-page.module').then(m => m.AboutPageModule) },
  { path: 'blog', loadChildren: () => import('./components/about-page/about-page.module').then(m => m.AboutPageModule) },
  { path: 'painel-admin', loadChildren: () => import('./admin/painel/painel.module').then(m => m.PainelModule) },
  { path: 'solucoes', loadChildren: () => import('./components/solutions/solutions.module').then(m => m.SolutionsModule) },
  { path: 'contato', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule) },
  { path: 'trabalhe-conosco', loadChildren: () => import('./components/vacancies/vacancies.module').then(m => m.VacanciesModule) },
  { path: 'trilha-egedoc', loadChildren: () => import('./components/trilha/trilha.module').then(m => m.TrilhaModule) },
  { path: 'experimente-gratis', loadChildren: () => import('./components/try-free/try-free.module').then(m => m.TryFreeModule) },
  { path: 'confirmacao', loadChildren: () => import('./components/confirmation-tester/confirmation-tester.module').then(m => m.ConfirmationTesterModule) },
  { path: 'portal-admin', loadChildren: () => import('./authentication/portal/portal.module').then(m => m.PortalModule) },
  { path: 'planos-precos', loadChildren: () => import('./components/plans-prices/plans-prices.module').then(m => m.PlansPricesModule) },
  { path: 'parceiros', loadChildren: () => import('./components/partners/partners.module').then(m => m.PartnersModule) },
  { path: 'funcionalidades', loadChildren: () => import('./components/partners/partners.module').then(m => m.PartnersModule) },

  // ########## PLATFORM ###########

  { path: 'folders', loadChildren: () => import('./platform/folder/folder-list.module').then(m => m.FolderListModule) },
  { path: 'documents', loadChildren: () => import('./platform/document/document-form.module').then(m => m.DocumentFormModule) },
  { path: 'document-favorite', loadChildren: () => import('./platform/favorites/document-favorite/document-favorite.module').then(m => m.DocumentFavoriteModule) },
  { path: 'folder-favorite', loadChildren: () => import('./platform/favorites/folder-favorite/folder-favorite.module').then(m => m.FolderFavoriteModule) },
  { path: 'files', loadChildren: () => import('./platform/folder/folder-list.module').then(m => m.FolderListModule) },
  { path: 'preview-file', loadChildren: () => import('./platform/previewer/previewer.module').then(m => m.PreviewerModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
