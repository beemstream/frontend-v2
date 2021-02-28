import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStreamListComponent } from './filter-stream-list.component';

describe('FilterStreamListComponent', () => {
  let component: FilterStreamListComponent;
  let fixture: ComponentFixture<FilterStreamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterStreamListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterStreamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
