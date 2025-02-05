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
  selectedEditRow!: any;
  editMode: boolean = false;
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
      parentezco: rowData.parentezco,
      patologia: rowData.patologia
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
      this.antecedentesfamiliaresOutPut.emit(this.antecedentesAspirante);
    }
  }


  onSubmit() {
    const indexLength = this.antecedentesAspirante.length;
    let obj = {};
    obj = {
      parentezco: '',
      patologia: '',
      index: 0
    };

    obj = {
      parentezco: this.antecedentesForm?.get('parentezco')?.value,
      patologia: this.antecedentesForm?.get('patologia')?.value,
      index: indexLength + 1
    };

    if (this.editMode) {

      const index = this.antecedentesAspirante.findIndex(item =>
        item.index === this.selectedEditRow.index
      );

      if (index !== -1) {
        obj = {
          parentezco: this.antecedentesForm?.get('parentezco')?.value,
          patologia: this.antecedentesForm?.get('patologia')?.value,
          index: this.selectedEditRow.index
        };
        this.antecedentesAspirante[index] = obj;
        this.antecedentesfamiliaresOutPut.emit(this.antecedentesAspirante);
        this.showDialog(false);
        this.antecedentesForm.reset();
      }
    } else {
      this.antecedentesAspirante.push(obj);
      this.showDialog(false);
      this.antecedentesfamiliaresOutPut.emit(this.antecedentesAspirante);
      this.antecedentesForm.reset();

    }


  }

}
