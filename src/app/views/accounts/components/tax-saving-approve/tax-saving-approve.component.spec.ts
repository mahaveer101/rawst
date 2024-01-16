import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSavingApproveComponent } from './tax-saving-approve.component';

describe('TaxSavingApproveComponent', () => {
  let component: TaxSavingApproveComponent;
  let fixture: ComponentFixture<TaxSavingApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxSavingApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxSavingApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
