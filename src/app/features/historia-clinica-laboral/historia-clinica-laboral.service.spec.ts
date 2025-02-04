import { TestBed } from '@angular/core/testing';

import { HistoriaClinicaLaboralService } from './historia-clinica-laboral.service';

describe('HistoriaClinicaLaboralService', () => {
  let service: HistoriaClinicaLaboralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriaClinicaLaboralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
