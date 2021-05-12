import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '../icon.service';
import { Icon } from '../programming-language-icon';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit {
  @Input() icon!: Icon;

  svg!: SafeHtml;

  constructor(
    private sanitzer: DomSanitizer,
    private iconService: IconService
  ) {}

  ngOnInit(): void {
    this.svg = this.sanitzer.bypassSecurityTrustHtml(
      this.iconService.getIcon(this.icon)
    );
  }
}
