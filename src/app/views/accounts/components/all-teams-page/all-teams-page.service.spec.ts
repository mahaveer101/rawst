import { TestBed } from '@angular/core/testing';

import { AllTeamsPageService } from './all-teams-page.service';

describe('AllTeamsPageService', () => {
  let service: AllTeamsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllTeamsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
