import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nbp-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.css']
})
export class CategoryHeaderComponent implements OnInit {

  @Input() titleIcon?: IconProp;
  @Input() title?: string;
  @Input() link?: string;
  @Input() showLink: boolean = true;

  faArrowRight = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

}
