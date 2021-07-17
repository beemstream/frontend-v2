import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [FontAwesomeModule, CommonModule],
  exports: [IconComponent],
})
export class IconModule {}
