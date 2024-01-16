import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WFHComponent } from './wfh.component';

describe('WFHComponent', () => {
  let component: WFHComponent;
  let fixture: ComponentFixture<WFHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WFHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WFHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
