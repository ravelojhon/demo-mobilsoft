import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexoPruebasVestibularesComponent } from './anexo-pruebas-vestibulares.component';

describe('AnexoPruebasVestibularesComponent', () => {
  let component: AnexoPruebasVestibularesComponent;
  let fixture: ComponentFixture<AnexoPruebasVestibularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoPruebasVestibularesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnexoPruebasVestibularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
