import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexoEnfasisOsteomuscularComponent } from './anexo-enfasis-osteomuscular.component';

describe('AnexoEnfasisOsteomuscularComponent', () => {
  let component: AnexoEnfasisOsteomuscularComponent;
  let fixture: ComponentFixture<AnexoEnfasisOsteomuscularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoEnfasisOsteomuscularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnexoEnfasisOsteomuscularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
