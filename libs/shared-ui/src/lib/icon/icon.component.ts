import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '../icon.service';
import { Icon } from '../programming-language-icon';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit, AfterViewInit {
  @Input() icon!: Icon;
  @Input() iconClass: string = '';

  svg!: SafeHtml;

  @ViewChild('svgContainer') svgContainerElem?: ElementRef;

  constructor(
    private sanitzer: DomSanitizer,
    private iconService: IconService
  ) {}

  ngAfterViewInit(): void {
    const svg = this.svgContainerElem?.nativeElement.querySelector('svg');
    svg.setAttribute('class', `fill-current ${this.iconClass}`);
  }

  ngOnInit(): void {
    this.svg = this.sanitzer.bypassSecurityTrustHtml(
      this.iconService.getIcon(this.icon)
    );
  }
}
