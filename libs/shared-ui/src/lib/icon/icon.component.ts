import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconService } from '../icon.service';
import { Icon } from '../programming-language-icon';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit, AfterViewInit {
  @Input() icon!: Icon | IconProp;
  @Input() iconSource: 'fa' | 'beemstream' = 'beemstream';
  @Input() iconClass: string = '';
  finishedRender = false;

  svg!: SafeHtml;

  @ViewChild('svgContainer') svgContainerElem?: ElementRef;

  constructor(
    private sanitzer: DomSanitizer,
    private iconService: IconService
  ) {}

  ngAfterViewInit(): void {
    if (this.iconSource === 'beemstream' && !this.finishedRender) {
      const svg = this.svgContainerElem?.nativeElement.querySelector('svg');
      svg.setAttribute('class', `fill-current ${this.iconClass}`);
    }
  }

  ngOnInit(): void {
    if (this.iconSource === 'beemstream') {
      this.svg = this.sanitzer.bypassSecurityTrustHtml(
        this.iconService.getIcon(this.icon as Icon)
      );
    }
  }
}

@NgModule({
  declarations: [IconComponent],
  imports: [FontAwesomeModule, CommonModule],
  exports: [IconComponent],
})
export class IconModule {}
