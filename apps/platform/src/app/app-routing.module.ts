import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'browse',
    data: {
      title: 'BeemStream browse programming categories',
      description: 'Explore live coding livestreams of different programming categories. Browse between game development, web development, mobile development and other engineering/computer science streams.',
    },
    loadChildren: () =>
      import('./browse/browse.module').then((m) => m.BrowseModule),
  },
  {
    path: 'random',
    loadChildren: () =>
      import('./random/random.module').then((m) => m.RandomModule),
  },
  {
    path: 'stream',
    loadChildren: () =>
      import('./stream-detail/stream-detail.module').then(
        (m) => m.StreamDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
