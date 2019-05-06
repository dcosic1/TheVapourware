import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsultantiComponent } from './konsultanti.component';

describe('KonsultantiComponent', () => {
  let component: KonsultantiComponent;
  let fixture: ComponentFixture<KonsultantiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonsultantiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsultantiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
