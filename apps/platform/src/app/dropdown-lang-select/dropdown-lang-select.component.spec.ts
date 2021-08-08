import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownLangSelectComponent } from './dropdown-lang-select.component';

describe('DropdownLangSelectComponent', () => {
  let component: DropdownLangSelectComponent;
  let fixture: ComponentFixture<DropdownLangSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownLangSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownLangSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
