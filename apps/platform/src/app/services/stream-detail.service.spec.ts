import { TestBed } from '@angular/core/testing';

import { StreamDetailService } from './stream-detail.service';

describe('StreamDetailService', () => {
  let service: StreamDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
