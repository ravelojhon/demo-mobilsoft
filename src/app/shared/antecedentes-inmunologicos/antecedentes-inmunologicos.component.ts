import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-antecedentes-inmunologicos',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToggleSwitchModule, InputTextModule, ButtonModule],
  templateUrl: './antecedentes-inmunologicos.component.html',
  styleUrl: './antecedentes-inmunologicos.component.css'
})
export class AntecedentesInmunologicosComponent implements OnInit{
  antecedentesInmunoForm!: FormGroup;

  @Output() antecedentesInmunoOutPut = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.revisionSistemasForm.valueChanges.subscribe((value) => {
    //   if (this.revisionSistemasForm.valid) {
    //     this.revisionSistemaOutPut.emit(value);
    //   }
    // })
  }

  initForm(): FormGroup {
    return this.antecedentesInmunoForm = this.fb.group({
      swVacunaTetanos: [false],
      numDosisVacunaTetanos: [''],

      swVacunaHepatitis: [false],
      numDosisVacunaHepatitis: [''],

      swVacunaCovid19: [false],
      numDosisVacunaCovid19: [''],
    });
  }

  onSubmit(){
    this.antecedentesInmunoOutPut.emit(this.antecedentesInmunoForm.value);
  }
}
