import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatProfileImageComponent } from './updat-profile-image.component';

describe('UpdatProfileImageComponent', () => {
  let component: UpdatProfileImageComponent;
  let fixture: ComponentFixture<UpdatProfileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatProfileImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
