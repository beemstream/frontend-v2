import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCode, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { ProgrammingLanguage } from '../../../../utils';

@Component({
  selector: 'nbp-dropdown-code-lang-select',
  templateUrl: './dropdown-code-lang-select.component.html',
  styleUrls: ['./dropdown-code-lang-select.component.css'],
})
export class DropdownCodeLangSelectComponent {
  @Input()
  options: ProgrammingLanguage[] = [];

  @Output()
  optionsSelectedChanged = new EventEmitter<ProgrammingLanguage[]>();

  languageMappings = {
    rust: 'Rust',
    typescript: 'TypeScript',
    python: 'Python',
    golang: 'Go',
    csharp: 'C#',
    javascript: 'JavaScript',
    java: 'Java',
    cpp: 'C++',
    php: 'PHP',
    kotlin: 'Kotlin',
    uncategorized: 'Uncategorized',
    gdscript: 'Godot',
  };

  faQuestion = faQuestion;

  faCode = faCode;
}
