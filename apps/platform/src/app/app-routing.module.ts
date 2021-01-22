import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'browse', loadChildren: () => import('./browse/browse.module').then(m => m.BrowseModule) },
    { path: 'random', loadChildren: () => import('./random/random.module').then(m => m.RandomModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
