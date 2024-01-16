import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSavingListComponent } from './tax-saving-list.component';

describe('TaxSavingListComponent', () => {
  let component: TaxSavingListComponent;
  let fixture: ComponentFixture<TaxSavingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxSavingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxSavingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
