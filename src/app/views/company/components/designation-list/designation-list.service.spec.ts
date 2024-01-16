import { TestBed } from '@angular/core/testing';

import { DesignationListService } from './designation-list.service';

describe('DesignationListService', () => {
  let service: DesignationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
