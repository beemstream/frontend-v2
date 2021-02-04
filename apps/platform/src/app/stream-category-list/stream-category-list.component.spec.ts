import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamCategoryListComponent } from './stream-category-list.component';

describe('StreamCategoryListComponent', () => {
  let component: StreamCategoryListComponent;
  let fixture: ComponentFixture<StreamCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
