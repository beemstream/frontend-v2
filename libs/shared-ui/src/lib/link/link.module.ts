import { NgModule } from '@angular/core';
import { LinkComponent } from './link.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LinkComponent],
  imports: [RouterModule, CommonModule],
  exports: [LinkComponent],
})
export class LinkModule {}
