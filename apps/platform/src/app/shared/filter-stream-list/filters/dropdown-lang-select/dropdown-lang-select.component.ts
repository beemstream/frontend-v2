import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { ISO_LANGUAGE } from './iso-language';

@Component({
  selector: 'nbp-dropdown-lang-select',
  templateUrl: './dropdown-lang-select.component.html',
  styleUrls: ['./dropdown-lang-select.component.css'],
})
export class DropdownLangSelectComponent {
  @Input()
  languages: string[] = [];

  @Output()
  languagesChanged = new EventEmitter();

  @Input()
  selectedLangs?: string[];

  languageMappings = ISO_LANGUAGE;

  faGlobe = faGlobe;
}
