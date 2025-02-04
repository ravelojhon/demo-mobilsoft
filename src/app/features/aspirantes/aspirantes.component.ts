import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog, DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select, SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { AspirantesService } from './aspirantes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aspirantes',
  imports: [CommonModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule],
  standalone: true,
  templateUrl: './aspirantes.component.html',
  styleUrl: './aspirantes.component.css',

})
export class AspirantesComponent implements OnInit {

  aspirantes: any[] = [];
  showForm = false;
  editMode = false;
  formTitle = 'Crear Aspirante';
  aspiranteForm!: FormGroup;
  selectedAspirante: any;
  selectedRow! :any;
  // aspirantes!: any[];

  cols!: any[];

  typeDocuments: any[] = [
    { codigo: "CC", id: 1 },
    { codigo: "TI", id: 2 },
    { codigo: "CE", id: 3 },
  ]

  sexo: any[] = [
    { codigo: "F", id: 1, label: "Masculino" },
    { codigo: "M", id: 2, label: "Femenino" },
  ]

  estadoCivil: any[] = [
    { label: "Soltero", id: 1 },
    { label: "Casado", id: 2 },
    { label: "Viudo", id: 3 },
    { label: "Separado", id: 4 }
  ]

  grupoSanguinieo: any[] = [
    { label: "A +", id: 1 },
    { label: "A -", id: 2 },
    { label: "B +", id: 3 },
    { label: "B -", id: 4 },
    { label: "AB +", id: 5 },
    { label: "AB -", id: 6 },
    { label: "O +", id: 7 },
    { label: "O - ", id: 8 },
  ]

  NivelEducativo: any[] = [
    { label: "Basica Primaria", id: 1 },
    { label: "Basica Secundaria", id: 2 },
    { label: "Bachiller", id: 3 },
    { label: "Tecnico", id: 4 },
    { label: "Tecnologo", id: 5 },
    { label: "Profesional", id: 6 },
    { label: "Posgrado", id: 7 },
  ]



  constructor(
    private aspiranteService: AspirantesService,
    private fb: FormBuilder
  ) {
    this.aspiranteForm = this.fb.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      TipoDocumento: ['', Validators.required],
      NumeroDocumento: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      Sexo: ['', Validators.required],
      EstadoCivil: [''],
      GrupoSanguineo: [''],
      Direccion: ['', Validators.required],
      Telefono: [''],
      CorreoElectronico: [''],
      NivelEducativo: [''],
      CargoAspirado: [''],
      Documentos: [''],
      EmpresaId: ['']
    })
  }
  ngOnInit(): void {
    this.cols = [
      { field: "Nombres", header: "Nombres" },
      { field: "Apellidos", header: "Apellidos" },
      { field: "TipoDocumento", header: "Tipo Documento" },
      { field: "NumeroDocumento", header: "Numero Documento" },
      { field: "FechaNacimientoFormatted", header: "Fecha Nacimiento" },
      { field: "Sexo", header: "Sexo" },
      { field: "EstadoCivil", header: "Estado Civil" },
      { field: "GrupoSanguineo", header: "Grupo Sanguineo" },
      { field: "Direccion", header: "Direccion" },
      { field: "Telefono", header: "Telefono" },
      { field: "CorreoElectronico", header: "Correo Electronico" },
      { field: "NivelEducativo", header: "Nivel Educativo" },
      { field: "CargoAspirado", header: "Cargo Aspirado" },
      { field: "Documentos", header: "Documentos" },
      { field: "Empresa", header: "Empresa Id" },
    ];
    this.loadAspirantes();
  }

  loadAspirantes() {
    this.aspiranteService.getAspirantes().subscribe({
      next: (data) => {
        this.aspirantes = data?.resultado[0]; 
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
    if(state ===false){
      this.selectedRow = null
    }
    this.showForm = state;
  }

  createAspirante() {
    this.selectedRow=null
    this.aspiranteForm.reset();
    // this.showForm = true;
    this.showDialog(true)
    this.formTitle = 'Crear Aspirante';
    this.editMode = false;
  }

  editarAspirante(aspirante: any) {
    this.selectedRow=aspirante;

    const findTipoDocumento = this.typeDocuments?.find((tipo: any) => tipo.codigo === aspirante.TipoDocumento)
    const findSexo = this.sexo?.find((tipo: any) => tipo.label === aspirante.Sexo)
    const findEstado = this.estadoCivil?.find((tipo: any) => tipo.label === aspirante.EstadoCivil)
    const findGrupo = this.grupoSanguinieo?.find((tipo: any) => tipo.label === aspirante.GrupoSanguineo)
    const findNivel = this.NivelEducativo?.find((tipo: any) => tipo.label === aspirante.NivelEducativo)

    this.aspiranteForm.get('Nombres')?.setValue(aspirante?.Nombres)
       this.aspiranteForm.get('Apellidos')?.setValue(aspirante?.Apellidos)
       this.aspiranteForm.get('TipoDocumento')?.setValue(findTipoDocumento)
       this.aspiranteForm.get('NumeroDocumento')?.setValue(aspirante?.NumeroDocumento)
       this.aspiranteForm.get('FechaNacimiento')?.setValue(aspirante?.FechaNacimiento)
       this.aspiranteForm.get('Sexo')?.setValue(findSexo)
       this.aspiranteForm.get('EstadoCivil')?.setValue(findEstado)
       this.aspiranteForm.get('GrupoSanguineo')?.setValue(findGrupo)
       this.aspiranteForm.get('Direccion')?.setValue(aspirante?.Direccion)
       this.aspiranteForm.get('Telefono')?.setValue(aspirante?.Telefono)
       this.aspiranteForm.get('CorreoElectronico')?.setValue(aspirante?.CorreoElectronico)
       this.aspiranteForm.get('NivelEducativo')?.setValue(findNivel)
       this.aspiranteForm.get('CargoAspirado')?.setValue(aspirante?.CargoAspirado)
       this.aspiranteForm.get('Documentos')?.setValue(aspirante?.Documentos)
       this.aspiranteForm.get('EmpresaId')?.setValue(aspirante?.EmpresaId)
    
       this.showDialog(true)
}



  onSubmit() {
    const object = {
      AspiranteEmpleadoId: this.selectedRow !== null ? this.selectedRow?.AspiranteEmpleadoId : null,
      Nombres: this.aspiranteForm.get('Nombres')?.value,
      Apellidos: this.aspiranteForm.get('Apellidos')?.value,
      TipoDocumento: this.aspiranteForm.get('TipoDocumento')?.value?.codigo,
      NumeroDocumento: this.aspiranteForm.get('NumeroDocumento')?.value,
      FechaNacimiento: this.aspiranteForm.get('FechaNacimiento')?.value,
      Sexo: this.aspiranteForm.get('Sexo')?.value?.label,
      EstadoCivil: this.aspiranteForm.get('EstadoCivil')?.value?.label || null,
      GrupoSanguineo: this.aspiranteForm.get('GrupoSanguineo')?.value?.label || null,
      Direccion: this.aspiranteForm.get('Direccion')?.value,
      Telefono: this.aspiranteForm.get('Telefono')?.value || null,
      CorreoElectronico: this.aspiranteForm.get('CorreoElectronico')?.value || null,
      NivelEducativo: this.aspiranteForm.get('NivelEducativo')?.value?.label || null,
      CargoAspirado: this.aspiranteForm.get('CargoAspirado')?.value || null,
      Documentos: this.aspiranteForm.get('Documentos')?.value || null,
      EmpresaId: parseInt(this.aspiranteForm.get('EmpresaId')?.value) || null
    };

    console.log(object)

    if(this.selectedRow === null){
      this.aspiranteService.createAspirantes(object).subscribe({
        next: (data) => {
          // `data` es lo que recibimos de la API, en este caso una lista de aspirantes
          console.log('Aspirantes obtenidos:', data?.resultado[0]);
          this.aspirantes = data?.resultado[0]; // Asignamos los aspirantes a la variable
        },
        error: (error) => {
          // En caso de error, mostramos un mensaje
          console.error('Error al obtener los aspirantes', error);
          // this.errorMessage = 'Hubo un error al cargar los aspirantes. Intente nuevamente.';
        },
        complete: () => {
          console.log('La solicitud de aspirantes ha sido completada.');
          this.loadAspirantes();
          this.aspiranteForm.reset();
          this.showDialog(false)
        }
      });
    }else{
      this.aspiranteService.editAspirantes(object).subscribe({
        next: (data) => {
          // `data` es lo que recibimos de la API, en este caso una lista de aspirantes
          console.log('Aspirantes obtenidos:', data?.resultado[0]);
          this.aspirantes = data?.resultado[0]; // Asignamos los aspirantes a la variable
        },
        error: (error) => {
          // En caso de error, mostramos un mensaje
          console.error('Error al obtener los aspirantes', error);
          // this.errorMessage = 'Hubo un error al cargar los aspirantes. Intente nuevamente.';
        },
        complete: () => {
          console.log('La solicitud de aspirantes ha sido completada.');
          this.loadAspirantes();
          this.aspiranteForm.reset();
          this.showDialog(false)
        }
      });
    }
  }
}
