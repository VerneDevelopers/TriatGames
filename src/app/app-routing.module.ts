

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'ahorcado',
    loadChildren: () => import('./pages/ahorcado/ahorcado.module').then( m => m.AhorcadoPageModule)
  },

   {
    path: 'trivial',
    loadChildren: () => import('./pages/trivial/trivial.module').then( m => m.TrivialPageModule)
  },
  {
    path: 'lista-test',
    loadChildren: () => import('./pages/lista-test/lista-test.module').then( m => m.ListaTestPageModule)
  },

  {
    path: 'wordle',
    loadChildren: () => import('./pages/wordle/wordle.module').then( m => m.WordlePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

