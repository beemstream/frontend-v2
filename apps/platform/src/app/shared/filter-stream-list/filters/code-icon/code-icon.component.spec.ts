import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeIconComponent } from './code-icon.component';

describe('CodeIconComponent', () => {
  let component: CodeIconComponent;
  let fixture: ComponentFixture<CodeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
