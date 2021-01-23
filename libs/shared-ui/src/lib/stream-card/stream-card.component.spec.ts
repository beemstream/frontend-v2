import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamCardComponent } from './stream-card.component';

describe('StreamCardComponent', () => {
  let component: StreamCardComponent;
  let fixture: ComponentFixture<StreamCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
