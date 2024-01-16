import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInOutLogsComponent } from './all-in-out-logs.component';

describe('AllInOutLogsComponent', () => {
  let component: AllInOutLogsComponent;
  let fixture: ComponentFixture<AllInOutLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInOutLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInOutLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
