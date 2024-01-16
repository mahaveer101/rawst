import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdvancedPaymentComponent } from './view-advanced-payment.component';

describe('ViewAdvancedPaymentComponent', () => {
  let component: ViewAdvancedPaymentComponent;
  let fixture: ComponentFixture<ViewAdvancedPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdvancedPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdvancedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
