import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdjeliComponent } from './odjeli.component';

describe('OdjeliComponent', () => {
  let component: OdjeliComponent;
  let fixture: ComponentFixture<OdjeliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdjeliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdjeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
