import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UposleniciOdjeliComponent } from './uposlenici-odjeli.component';

describe('UposleniciOdjeliComponent', () => {
  let component: UposleniciOdjeliComponent;
  let fixture: ComponentFixture<UposleniciOdjeliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UposleniciOdjeliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UposleniciOdjeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
