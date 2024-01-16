import { TestBed } from '@angular/core/testing';

import { DepartmentListService } from './department-list.service';

describe('DepartmentListService', () => {
  let service: DepartmentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
