import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousTaxIncentiveComponent } from './previous-tax-incentive.component';

describe('PreviousTaxIncentiveComponent', () => {
  let component: PreviousTaxIncentiveComponent;
  let fixture: ComponentFixture<PreviousTaxIncentiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousTaxIncentiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousTaxIncentiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
