import { CommonModule } from '@angular/common';
import { Component, OnInit, Output,EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
// import { IAntecedentesGinecoIntreface, IAntecedentesIntreface } from './interfaces/IAntecedentesIntreface';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-enfermedades-laborales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule, TextareaModule],
  templateUrl: './enfermedadesLaborales.component.html',
  styleUrl: './enfermedadesLaborales.component.css'
})

export class EnfermedadesLaboralesComponent implements OnInit {
  // antecedentes: IAntecedentesIntreface[] = [];
  // antecedentesGineco: IAntecedentesGinecoIntreface[] = [];
  antecedentesAspirante: any[] = [];
  cols!: any[];
  selectedRow!: any;
  isGineco: boolean = false;
  showForm = false;
  antecedentesForm!: FormGroup;

  @Output() enfermedadesLaboralesOutPut = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: "empresa", header: "Empresa" },
      { field: "eloAoT", header: "EL A OT" },
      { field: "diagnostico", header: "Diagnostico" },
      { field: "fechaOcurrencia", header: "Fecha Ocurrencia" },
      { field: "radPcl", header: "Calificacion PCL" },
      { field: "porcentaje", header: "Porcentaje" },
      { field: "ampliacion", header: "Ampliacion" },
    ];
    this.initForm();
  }

  initForm(): FormGroup {
    return this.antecedentesForm = this.fb.group({
      Empresa: ['', Validators.required],
      eloAoT: ['', Validators.required],
      diagnostico: ['', Validators.required],
      fechaOcurrencia: ['', Validators.required],
      radPcl:[null],
      porcentaje:['', Validators.required],
      ampliacion:['', Validators.required],
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
      empresa:this.antecedentesForm?.get('Empresa')?.value,
      eloAoT:this.antecedentesForm?.get('eloAoT')?.value,
      diagnostico:this.antecedentesForm?.get('diagnostico')?.value,
      fechaOcurrencia: this.antecedentesForm?.get('fechaOcurrencia')?.value,
      radPcl: this.antecedentesForm?.get('radPcl')?.value,
      porcentaje: this.antecedentesForm?.get('porcentaje')?.value,
      ampliacion: this.antecedentesForm?.get('ampliacion')?.value
};
    this.antecedentesAspirante.push(obj);
    this.showDialog(false);
    this.enfermedadesLaboralesOutPut.emit(this.antecedentesAspirante);
  }

}
