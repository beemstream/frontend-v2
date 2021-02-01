import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamViewComponent } from './stream-view.component';

describe('StreamViewComponent', () => {
  let component: StreamViewComponent;
  let fixture: ComponentFixture<StreamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
