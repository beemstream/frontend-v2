import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamTagComponent } from './stream-tag.component';

describe('StreamTagComponent', () => {
  let component: StreamTagComponent;
  let fixture: ComponentFixture<StreamTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
