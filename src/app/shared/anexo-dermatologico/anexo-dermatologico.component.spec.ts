import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexoDermatologicoComponent } from './anexo-dermatologico.component';

describe('AnexoDermatologicoComponent', () => {
  let component: AnexoDermatologicoComponent;
  let fixture: ComponentFixture<AnexoDermatologicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoDermatologicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnexoDermatologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
