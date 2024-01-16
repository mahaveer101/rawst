import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedPaymentComponent } from './advanced-payment.component';

describe('AdvancedPaymentComponent', () => {
  let component: AdvancedPaymentComponent;
  let fixture: ComponentFixture<AdvancedPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
