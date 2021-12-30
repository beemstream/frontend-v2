import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconService } from '../icon.service';
import { Icon, IconSet } from '../programming-language-icon';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit, AfterViewInit {
  @Input() icon!: Icon | IconProp;
  @Input() iconClass = '';
  get isBeemStreamSource() {
    return IconSet.map((i) => i.name).includes(this.icon as Icon);
  }

  svg!: SafeHtml;

  @ViewChild('svgContainer') svgContainerElem!: ElementRef;

  constructor(
    private sanitzer: DomSanitizer,
    private iconService: IconService
  ) {}

  ngAfterViewInit(): void {
    if (this.isBeemStreamSource) {
      const svg = this.svgContainerElem.nativeElement.querySelector('svg');
      svg.setAttribute('class', `fill-current ${this.iconClass}`);
    }
  }

  ngOnInit(): void {
    if (this.isBeemStreamSource) {
      this.svg = this.sanitzer.bypassSecurityTrustHtml(
        this.iconService.getIcon(this.icon as Icon)
      );
    }
  }
}
