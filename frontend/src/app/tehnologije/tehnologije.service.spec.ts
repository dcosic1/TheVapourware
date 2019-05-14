import { TestBed } from '@angular/core/testing';

import { TehnologijeService } from './tehnologije.service';

describe('TehnologijeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TehnologijeService = TestBed.get(TehnologijeService);
    expect(service).toBeTruthy();
  });
});
