import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { DropdownOptionComponent } from '../dropdown-option/dropdown-option.component';

@NgModule({
  declarations: [DropdownComponent, DropdownOptionComponent],
  imports: [CommonModule],
  exports: [DropdownComponent],
})
export class DropdownModule {}
