import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeWorkTimeComponent } from './office-work-time.component';

describe('OfficeWorkTimeComponent', () => {
  let component: OfficeWorkTimeComponent;
  let fixture: ComponentFixture<OfficeWorkTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeWorkTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeWorkTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
