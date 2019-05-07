import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DobavljaciComponent } from './dobavljaci.component';

describe('DobavljaciComponent', () => {
  let component: DobavljaciComponent;
  let fixture: ComponentFixture<DobavljaciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DobavljaciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DobavljaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
