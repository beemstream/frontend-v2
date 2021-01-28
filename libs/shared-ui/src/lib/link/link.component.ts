import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent implements OnInit {

  @Input() routerLink: string;
  @Input() linkName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
