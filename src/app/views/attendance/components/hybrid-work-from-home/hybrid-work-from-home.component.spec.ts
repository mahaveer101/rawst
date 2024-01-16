import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HybridWorkFromHomeComponent } from './hybrid-work-from-home.component';

describe('HybridWorkFromHomeComponent', () => {
  let component: HybridWorkFromHomeComponent;
  let fixture: ComponentFixture<HybridWorkFromHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HybridWorkFromHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HybridWorkFromHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
