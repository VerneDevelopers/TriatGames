import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'ahorcado',
    loadChildren: () => import('./pages/ahorcado/ahorcado.module').then(m => m.AhorcadoPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'trivial',
    loadChildren: () => import('./pages/trivial/trivial.module').then(m => m.TrivialPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'lista-test',
    loadChildren: () => import('./pages/lista-test/lista-test.module').then(m => m.ListaTestPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'who-are',
    loadChildren: () => import('./pages/who-are/who-are.module').then( m => m.WhoArePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },{
    path: 'wordle',
    loadChildren: () => import('./pages/wordle/wordle.module').then( m => m.WordlePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
   },
  {
    path: 'puntuaciones',
    loadChildren: () => import('./pages/puntuaciones/puntuaciones.module').then( m => m.PuntuacionesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'admin314',
    loadChildren: () => import('./pages/admin314/admin314.module').then( m => m.Admin314PageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

