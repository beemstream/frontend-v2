import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCodeLangSelectComponent } from './dropdown-code-lang-select.component';

describe('DropdownCodeLangSelectComponent', () => {
  let component: DropdownCodeLangSelectComponent;
  let fixture: ComponentFixture<DropdownCodeLangSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownCodeLangSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownCodeLangSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
