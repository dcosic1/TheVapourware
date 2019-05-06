import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UposleniciComponent } from './uposlenici.component';

describe('UposleniciComponent', () => {
  let component: UposleniciComponent;
  let fixture: ComponentFixture<UposleniciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UposleniciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UposleniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
