import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComapanyLogoComponent } from './edit-comapany-logo.component';

describe('EditComapanyLogoComponent', () => {
  let component: EditComapanyLogoComponent;
  let fixture: ComponentFixture<EditComapanyLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComapanyLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComapanyLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
