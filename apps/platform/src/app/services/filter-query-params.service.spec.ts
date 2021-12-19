import { TestBed } from '@angular/core/testing';

import { FilterQueryParamsService } from './filter-query-params.service';

describe('FilterQueryParamsService', () => {
  let service: FilterQueryParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterQueryParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
