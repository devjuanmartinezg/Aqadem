import { TestBed } from '@angular/core/testing';

import { ClaseDetalleService } from './clase-detalle.service';

describe('ClaseDetalleService', () => {
  let service: ClaseDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaseDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
