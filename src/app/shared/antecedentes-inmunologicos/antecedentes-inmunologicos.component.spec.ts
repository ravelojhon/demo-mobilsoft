import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesInmunologicosComponent } from './antecedentes-inmunologicos.component';

describe('AntecedentesInmunologicosComponent', () => {
  let component: AntecedentesInmunologicosComponent;
  let fixture: ComponentFixture<AntecedentesInmunologicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntecedentesInmunologicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntecedentesInmunologicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
