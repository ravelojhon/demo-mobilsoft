import { CommonModule } from '@angular/common';
import { Component, OnInit, Output,EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { IAntecedentesGinecoIntreface, IAntecedentesIntreface } from './interfaces/IAntecedentesIntreface';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-antecedentes-familiares',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule, TextareaModule],
  templateUrl: './antecedentesFamiliares.component.html',
  styleUrl: './antecedentesFamiliares.component.css'
})
export class AntecedentesFamiliaresComponent implements OnInit {
  antecedentes: IAntecedentesIntreface[] = [];
  antecedentesGineco: IAntecedentesGinecoIntreface[] = [];
  antecedentesAspirante: any[] = [];
  cols!: any[];
  selectedRow!: any;
  isGineco: boolean = false;
  showForm = false;
  antecedentesForm!: FormGroup;

  @Output() antecedentesfamiliaresOutPut = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: "parentezco", header: "Parentezco" },
      { field: "patologia", header: "Patologia" },
    ];
    this.initForm();
  }

  initForm(): FormGroup {
    return this.antecedentesForm = this.fb.group({
      parentezco: ['', Validators.required],
      patologia: ['', Validators.required],
    });
  }


  showDialog(state: boolean) {
    if (state === false) {
     this.antecedentesForm.reset();
    }
    this.showForm = state;
  }

  addAntecedente() {
    this.showDialog(true)
  }


  onSubmit() {

    const obj = {
      parentezco: this.antecedentesForm?.get('parentezco')?.value,
      patologia: this.antecedentesForm?.get('patologia')?.value
};
    this.antecedentesAspirante.push(obj);
    this.showDialog(false);
    this.antecedentesfamiliaresOutPut.emit(this.antecedentesAspirante);
  }

}
