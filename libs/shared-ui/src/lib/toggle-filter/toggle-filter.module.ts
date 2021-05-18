import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { ToggleFilterComponent } from './toggle-filter.component';

@NgModule({
  declarations: [ToggleFilterComponent],
  imports: [CommonModule, ButtonModule, IconModule],
  exports: [ToggleFilterComponent],
})
export class ToggleFilterModule {}
