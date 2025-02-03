import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenEvaluacionComponent } from './orden-evaluacion.component';

describe('OrdenEvaluacionComponent', () => {
  let component: OrdenEvaluacionComponent;
  let fixture: ComponentFixture<OrdenEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenEvaluacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
