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
  antecedentesAspirante: IAntecedentesIntreface[] = [];
  cols!: any[];
  selectedRow!: any;
  isGineco: boolean = false;
  showForm = false;
  antecedentesForm!: FormGroup;

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




  onSubmit() {

    const obj = {
      id: this.selectedRow?.id,
      codigo: this.selectedRow?.codigo,
      nombre_antecedente: this.selectedRow?.nombre_antecedente, 
      estado: this.selectedRow?.estado,
      ampliacion:this.antecedentesForm?.get('ampliacion')?.value,
      id_antecedente: this.selectedRow?.id,
      codigoGineco: this.antecedentesForm?.get('antecedentesGineco')?.value?.codigo,
      nombre_antecedente_gineco: this.antecedentesForm?.get('antecedentesGineco')?.value?.nombre_antecedente_gineco
};
    this.antecedentesAspirante.push(obj);
    this.showDialog(false);
    this.antecedentesOutPut.emit(this.antecedentesAspirante);
  }

}
