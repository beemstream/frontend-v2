import { Component, Input } from '@angular/core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { ProgrammingLanguage } from '../../../../utils';

@Component({
  selector: 'nbp-code-icon',
  templateUrl: './code-icon.component.html',
  styleUrls: ['./code-icon.component.css'],
})
export class CodeIconComponent {
  @Input()
  icon!: `${ProgrammingLanguage}`;
  faQuestion = faQuestion;
}
