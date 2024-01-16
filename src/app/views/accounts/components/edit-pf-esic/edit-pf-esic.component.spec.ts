import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPfEsicComponent } from './edit-pf-esic.component';

describe('EditPfEsicComponent', () => {
  let component: EditPfEsicComponent;
  let fixture: ComponentFixture<EditPfEsicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPfEsicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPfEsicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
