import { TestBed } from '@angular/core/testing';

import { StreamCollectionService } from './stream-collection.service';

describe('StreamCollectionService', () => {
  let service: StreamCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
