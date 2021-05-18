import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleFilterComponent } from './toggle-filter.component';

describe('ToggleFilterComponent', () => {
  let component: ToggleFilterComponent;
  let fixture: ComponentFixture<ToggleFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
