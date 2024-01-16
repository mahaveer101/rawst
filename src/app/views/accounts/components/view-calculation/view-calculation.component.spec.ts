import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalculationComponent } from './view-calculation.component';

describe('ViewCalculationComponent', () => {
  let component: ViewCalculationComponent;
  let fixture: ComponentFixture<ViewCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
