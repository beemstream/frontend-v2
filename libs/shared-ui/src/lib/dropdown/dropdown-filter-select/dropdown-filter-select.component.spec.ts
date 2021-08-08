import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFilterSelectComponent } from './dropdown-filter-select.component';

describe('DropdownFilterSelectComponent', () => {
  let component: DropdownFilterSelectComponent;
  let fixture: ComponentFixture<DropdownFilterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownFilterSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
