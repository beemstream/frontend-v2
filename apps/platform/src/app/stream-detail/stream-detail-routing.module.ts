import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreamDetailComponent } from './stream-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 't/:username', component: StreamDetailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamDetailRoutingModule {}
