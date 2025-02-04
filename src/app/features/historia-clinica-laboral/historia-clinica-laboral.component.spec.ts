import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaLaboralComponent } from './historia-clinica-laboral.component';

describe('HistoriaClinicaLaboralComponent', () => {
  let component: HistoriaClinicaLaboralComponent;
  let fixture: ComponentFixture<HistoriaClinicaLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriaClinicaLaboralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaClinicaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
