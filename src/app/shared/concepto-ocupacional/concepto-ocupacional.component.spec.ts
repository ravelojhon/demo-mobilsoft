import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoOcupacionalComponent } from './concepto-ocupacional.component';

describe('ConceptoOcupacionalComponent', () => {
  let component: ConceptoOcupacionalComponent;
  let fixture: ComponentFixture<ConceptoOcupacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptoOcupacionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoOcupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
