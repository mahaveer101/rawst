import { TestBed } from '@angular/core/testing';

import { NoticeBoardAnnouncementService } from './notice-board-announcement.service';

describe('NoticeBoardAnnouncementService', () => {
  let service: NoticeBoardAnnouncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticeBoardAnnouncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
