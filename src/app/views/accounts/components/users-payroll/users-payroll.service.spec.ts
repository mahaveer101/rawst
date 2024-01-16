import { TestBed } from '@angular/core/testing';

import { UsersPayrollService } from './users-payroll.service';

describe('UsersPayrollService', () => {
  let service: UsersPayrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersPayrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
