import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBoardAnnouncementComponent } from './notice-board-announcement.component';

describe('NoticeBoardAnnouncementComponent', () => {
  let component: NoticeBoardAnnouncementComponent;
  let fixture: ComponentFixture<NoticeBoardAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeBoardAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeBoardAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
