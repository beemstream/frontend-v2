import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownModule } from '../dropdown/dropdown.module';
import { DropdownFilterSelectComponent } from './dropdown-filter-select.component';

@NgModule({
  declarations: [DropdownFilterSelectComponent],
  imports: [DropdownModule, CommonModule],
  exports: [DropdownFilterSelectComponent],
})
export class DropdownFilterSelectModule {}
