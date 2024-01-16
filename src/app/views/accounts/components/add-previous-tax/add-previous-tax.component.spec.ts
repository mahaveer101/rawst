import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreviousTaxComponent } from './add-previous-tax.component';

describe('AddPreviousTaxComponent', () => {
  let component: AddPreviousTaxComponent;
  let fixture: ComponentFixture<AddPreviousTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPreviousTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPreviousTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
