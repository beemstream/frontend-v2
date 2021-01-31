import { NgModule } from '@angular/core';
import { LinkComponent } from './link.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LinkComponent],
  imports: [RouterModule],
  exports: [LinkComponent],
})
export class LinkModule {}
