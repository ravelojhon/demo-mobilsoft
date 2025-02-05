import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { IAntecedentesAspiranteIntreface, IAntecedentesGinecoIntreface, IAntecedentesIntreface } from './interfaces/IAntecedentesIntreface';
import { AntecedentesService } from './antecedentes.service';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-antecedentes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule, TextareaModule],
  templateUrl: './antecedentes.component.html',
  styleUrl: './antecedentes.component.css'
})
export class AntecedentesComponent implements OnInit {
  antecedentes: IAntecedentesIntreface[] = [];
  antecedentesGineco: IAntecedentesGinecoIntreface[] = [];
  antecedentesAspirante: IAntecedentesAspiranteIntreface[] = [];
  cols!: any[];
  selectedRow!: any;
  selectedEditRow!: any;
  isGineco: boolean = false;
  showForm = false;
  antecedentesForm!: FormGroup;
  editMode: boolean = false;

  @Output() antecedentesOutPut = new EventEmitter<any>();

  constructor(
    private antecedentesService: AntecedentesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: "nombre_antecedente", header: "Nombre Antecedente" },
      { field: "ampliacion", header: "Ampliacion" },
      { field: "nombre_antecedente_gineco", header: "Nombre Antecedente Gineco" },
    ];
    this.loadAntecedentes();
    this.loadAntecedentesGineco();
    this.initForm();
  }

  initForm(): FormGroup {
    return this.antecedentesForm = this.fb.group({
      antecedentes: ['', Validators.required],
      ampliacion: ['', Validators.required],
      antecedentesGineco: ['']
    });
  }

  loadAntecedentes() {
    this.antecedentesService.getAntecedentes().subscribe({
      next: (data) => {
        this.antecedentes = data?.resultado[0];
      },
      error: (error) => {
        console.error('Error al obtener los aspirantes', error);
      },
      complete: () => {
        console.log('La solicitud de aspirantes ha sido completada.');
      }
    });
  }

  loadAntecedentesGineco() {
    this.antecedentesService.getAntecedentesGineco().subscribe({
      next: (data) => {
        this.antecedentesGineco = data?.resultado[0];
      },
      error: (error) => {
        console.error('Error al obtener los aspirantes', error);
      },
      complete: () => {
        console.log('La solicitud de aspirantes ha sido completada.');
      }
    });
  }

  showDialog(state: boolean) {
    if (state === false) {
      this.selectedRow = null
      this.editMode = false
      this.selectedEditRow = null
    }
    this.showForm = state;
  }

  addAntecedente() {
    this.showDialog(true)
  }

  changeAntecedente(event: any) {
    console.log(event)
    const value = event.value;
    this.selectedRow = value;
    if (value?.codigo === 'ANT007') {
      this.isGineco = true;
    } else {
      this.isGineco = false;
    }
  }

  editAntecedente(rowData: IAntecedentesAspiranteIntreface) {
    console.log(rowData)
    this.selectedRow = rowData;
    this.selectedEditRow = rowData;
    const antecedente = this.antecedentes.find(ant => ant.id === rowData.id);
    let gineco: any = {};
    if (antecedente?.codigo === 'ANT007') {
      this.isGineco = true;
      gineco = this.antecedentesGineco.find((ant: IAntecedentesGinecoIntreface) => ant.id === rowData.id_antecedente_gineco);
    } else {
      this.isGineco = false;
    }
    this.antecedentesForm.patchValue({
      antecedentes: antecedente,
      ampliacion: rowData.ampliacion,
      antecedentesGineco: gineco,
      index: rowData.index
    })
    this.showDialog(true);
    this.editMode = true
  }

  deleteAntecedente(rowData: IAntecedentesAspiranteIntreface) {
    const index = this.antecedentesAspirante.findIndex(item => 
      item?.index === rowData?.index
    );

    if (index !== -1) {
      this.antecedentesAspirante.splice(index, 1);
      this.antecedentesOutPut.emit(this.antecedentesAspirante);
    }
  }

  onSubmit() {

    const indexLength = this.antecedentesAspirante.length;

    let obj: IAntecedentesAspiranteIntreface = {
      id: 0,
      codigo: '',
      nombre_antecedente: '',
      estado: true,
      ampliacion: '',
      id_antecedente_gineco: 0,
      codigoGineco: '',
      nombre_antecedente_gineco: '',
      index: 0
    };

    obj = {
      id: this.selectedRow?.id,
      codigo: this.selectedRow?.codigo,
      nombre_antecedente: this.selectedRow?.nombre_antecedente,
      estado: this.selectedRow?.estado,
      ampliacion: this.antecedentesForm?.get('ampliacion')?.value,
      id_antecedente_gineco: this.antecedentesForm?.get('antecedentesGineco')?.value?.id !== undefined ? this.antecedentesForm?.get('antecedentesGineco')?.value?.id : 0,
      codigoGineco: this.antecedentesForm?.get('antecedentesGineco')?.value?.codigo !== undefined ? this.antecedentesForm?.get('antecedentesGineco')?.value?.codigo : null,
      nombre_antecedente_gineco: this.antecedentesForm?.get('antecedentesGineco')?.value?.nombre_antecedente_gineco !== undefined ? this.antecedentesForm?.get('antecedentesGineco')?.value?.nombre_antecedente_gineco : null,
      index: indexLength + 1
    };

    if (this.editMode) {

      const index = this.antecedentesAspirante.findIndex(item =>
        item.index === this.selectedEditRow.index
      );
      console.log(index)
      if (index !== -1) {
        let find = this.antecedentes.find(item => item.codigo === this.selectedRow?.codigo);
        let isGineco = find?.codigo === 'ANT007' ? true : false;
        obj = {
          id: this.selectedRow?.id,
          codigo: this.selectedRow?.codigo,
          nombre_antecedente: this.selectedRow?.nombre_antecedente,
          estado: this.selectedRow?.estado,
          ampliacion: this.antecedentesForm?.get('ampliacion')?.value,
          id_antecedente_gineco: isGineco ? this.antecedentesForm?.get('antecedentesGineco')?.value?.id : 0,
          codigoGineco: isGineco ? this.antecedentesForm?.get('antecedentesGineco')?.value?.codigo : '',
          nombre_antecedente_gineco: isGineco ? this.antecedentesForm?.get('antecedentesGineco')?.value?.nombre_antecedente_gineco : '',
          index: this.selectedEditRow.index
        };
        console.log(obj)
        this.antecedentesAspirante[index] = obj;
      }

    } else {
      // Modo creación
      this.antecedentesAspirante.push(obj);
    }

    this.showDialog(false);
    this.antecedentesForm.reset();
    this.antecedentesOutPut.emit(this.antecedentesAspirante);
  }

}
