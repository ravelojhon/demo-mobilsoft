import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionSistemasComponent } from './revision-sistemas.component';

describe('RevisionSistemasComponent', () => {
  let component: RevisionSistemasComponent;
  let fixture: ComponentFixture<RevisionSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionSistemasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
