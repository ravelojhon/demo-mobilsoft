import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
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
  selector: 'app-antecedentes-ocupacionales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule, TextareaModule],
  templateUrl: './antecedentesOcupacionales.component.html',
  styleUrl: './antecedentesOcupacionales.component.css'
})
export class AntecedentesOcupacionalesComponent implements OnInit {
  antecedentes: IAntecedentesIntreface[] = [];
  antecedentesGineco: IAntecedentesGinecoIntreface[] = [];
  antecedentesAspirante: any[] = [];
  cols!: any[];
  selectedRow!: any;
  isGineco: boolean = false;
  showForm = false;
  antecedentesForm!: FormGroup;
  selectedEditRow!: any;
  editMode: boolean = false;

  @Output() antecedentesOcupacionalesOutPut = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: "Empresa", header: "Empresa" },
      { field: "Biologico", header: "Biologico" },
      { field: "Fisico", header: "Fisico" },
      { field: "Biomecanico", header: "Biomecanico" },
      { field: "Quimico", header: "Quimico" },
      { field: "Condicion", header: "Condicion" },
      { field: "Psicosocial", header: "Psicosocial" },
      { field: "Cargo", header: "Cargo" },
      { field: "Antiguedad", header: "Antiguedad" },
      { field: "Epp", header: "Epp" },
    ];
    this.initForm();
  }

  initForm(): FormGroup {
    return this.antecedentesForm = this.fb.group({
      Empresa: ['', Validators.required],
      Biologico: ['', Validators.required],
      Fisico: ['', Validators.required],
      Biomecanico: ['', Validators.required],
      Quimico: ['', Validators.required],
      Condicion: ['', Validators.required],
      Psicosocial: ['', Validators.required],
      Cargo: ['', Validators.required],
      Antiguedad: ['', Validators.required],
      Epp: ['', Validators.required],
    });
  }


  showDialog(state: boolean) {
    if (state === false) {
      this.selectedRow = null
      this.editMode = false
      this.selectedEditRow = null
      this.antecedentesForm.reset();
    }
    this.showForm = state;
  }

  addAntecedente() {
    this.showDialog(true)
  }


  editAntecedente(rowData: any) {
    console.log(rowData)
    this.selectedRow = rowData;
    this.selectedEditRow = rowData;

    this.antecedentesForm.patchValue({
      Empresa: rowData.Empresa,
      Biologico: rowData.Biologico,
      Fisico: rowData.Fisico,
      Biomecanico: rowData.Biomecanico,
      Quimico: rowData.Quimico,
      Condicion: rowData.Condicion,
      Psicosocial: rowData.Psicosocial,
      Cargo: rowData.Cargo,
      Antiguedad: rowData.Antiguedad,
      Epp: rowData.Epp,
    })
    this.showDialog(true);
    this.editMode = true
  }

  deleteAntecedente(rowData: any) {
      const index = this.antecedentesAspirante.findIndex(item => 
        item?.index === rowData?.index
      );

      if (index !== -1) {
        this.antecedentesAspirante.splice(index, 1);
        this.antecedentesOcupacionalesOutPut.emit(this.antecedentesAspirante);
      }
  }

  onSubmit() {
    const indexLength = this.antecedentesAspirante.length;
    let obj = {}

    obj = {
      Empresa: '',
      Biologico: '',
      Fisico: '',
      Biomecanico: '',
      Quimico: '',
      Condicion: '',
      Psicosocial: '',
      Cargo: '',
      Antiguedad: '',
      Epp: '',
      index: 0
    };

    if (this.editMode) {
      const index = this.antecedentesAspirante.findIndex(item =>
        item.index === this.selectedEditRow.index
      );

      if (index !== -1) {
        obj = {
          Empresa: this.antecedentesForm?.get('Empresa')?.value,
          Biologico: this.antecedentesForm?.get('Biologico')?.value,
          Fisico: this.antecedentesForm?.get('Fisico')?.value,
          Biomecanico: this.antecedentesForm?.get('Biomecanico')?.value,
          Quimico: this.antecedentesForm?.get('Quimico')?.value,
          Condicion: this.antecedentesForm?.get('Condicion')?.value,
          Psicosocial: this.antecedentesForm?.get('Psicosocial')?.value,
          Cargo: this.antecedentesForm?.get('Cargo')?.value,
          Antiguedad: this.antecedentesForm?.get('Antiguedad')?.value,
          Epp: this.antecedentesForm?.get('Epp')?.value,
          index: this.selectedEditRow.index
        };

        this.antecedentesAspirante[index] = obj;
        this.antecedentesOcupacionalesOutPut.emit(this.antecedentesAspirante);
        this.showDialog(false);
        this.antecedentesForm.reset();
      }
    } else {
      obj = {
        Empresa: this.antecedentesForm?.get('Empresa')?.value,
        Biologico: this.antecedentesForm?.get('Biologico')?.value,
        Fisico: this.antecedentesForm?.get('Fisico')?.value,
        Biomecanico: this.antecedentesForm?.get('Biomecanico')?.value,
        Quimico: this.antecedentesForm?.get('Quimico')?.value,
        Condicion: this.antecedentesForm?.get('Condicion')?.value,
        Psicosocial: this.antecedentesForm?.get('Psicosocial')?.value,
        Cargo: this.antecedentesForm?.get('Cargo')?.value,
        Antiguedad: this.antecedentesForm?.get('Antiguedad')?.value,
        Epp: this.antecedentesForm?.get('Epp')?.value,
        index: indexLength + 1
      };
      this.antecedentesAspirante.push(obj);
      this.showDialog(false);
      this.antecedentesOcupacionalesOutPut.emit(this.antecedentesAspirante);
    }
  }
}
