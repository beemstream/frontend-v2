import { TestBed } from '@angular/core/testing';

import { StreamCategoryService } from './stream-category.service';

describe('StreamCategoryService', () => {
  let service: StreamCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
