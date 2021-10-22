import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowseComponent } from './browse.component';
import { BrowseCategoryDetailComponent } from './browse-category-detail/browse-category-detail.component';

const routes: Routes = [
  { path: '', component: BrowseComponent },
  { path: ':category', component: BrowseCategoryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseRoutingModule {}
