import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGradesListComponent } from './view-grades-list.component';

describe('ViewGradesListComponent', () => {
  let component: ViewGradesListComponent;
  let fixture: ComponentFixture<ViewGradesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGradesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGradesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
