import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiProjektaComponent } from './detalji-projekta.component';

describe('DetaljiProjektaComponent', () => {
  let component: DetaljiProjektaComponent;
  let fixture: ComponentFixture<DetaljiProjektaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaljiProjektaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljiProjektaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
