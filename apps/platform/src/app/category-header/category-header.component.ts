import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nbp-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.css'],
})
export class CategoryHeaderComponent {
  @Input() titleIcon?: IconProp;
  @Input() title?: string;
  @Input() link?: string;
  @Input() showLink = true;
  faArrowRight = faArrowRight;
}
