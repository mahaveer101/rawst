import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateannouncementsComponent } from './add-updateannouncements.component';

describe('AddUpdateannouncementsComponent', () => {
  let component: AddUpdateannouncementsComponent;
  let fixture: ComponentFixture<AddUpdateannouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateannouncementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateannouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
