import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCategoryDetailComponent } from './browse-category-detail.component';

describe('BrowseCategoryDetailComponent', () => {
  let component: BrowseCategoryDetailComponent;
  let fixture: ComponentFixture<BrowseCategoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseCategoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
