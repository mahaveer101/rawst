import { TestBed } from '@angular/core/testing';

import { GradesListService } from './grades-list.service';

describe('GradesListService', () => {
  let service: GradesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
