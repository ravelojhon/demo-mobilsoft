import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInfoPacienteComponent } from './header-info-paciente.component';

describe('HeaderInfoPacienteComponent', () => {
  let component: HeaderInfoPacienteComponent;
  let fixture: ComponentFixture<HeaderInfoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderInfoPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderInfoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
