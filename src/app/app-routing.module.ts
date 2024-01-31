import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'oscar',
    loadChildren: () => import('./pages/oscar/oscar.module').then( m => m.OscarPageModule)
  },
  {
    path: 'bernat',
    loadChildren: () => import('./pages/bernat/bernat.module').then( m => m.BernatPageModule)
  },
  {
    path: 'manucasado',
    loadChildren: () => import('./pages/manucasado/manucasado.module').then( m => m.ManucasadoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
