import { TestBed } from '@angular/core/testing';

import { ConstruccionService } from './construccion.service';

describe('ConstruccionService', () => {
  let service: ConstruccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstruccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
