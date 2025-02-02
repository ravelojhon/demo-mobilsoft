import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-aspirantes',
  imports: [CommonModule, ReactiveFormsModule, Dialog, InputTextModule, Select],
  standalone: true,
  templateUrl: './aspirantes.component.html',
  styleUrl: './aspirantes.component.css'
})
export class AspirantesComponent implements OnInit {
  aspirantes: any[] = [];
  showForm = false;
  editMode = false;
  formTitle = 'Crear Aspirante';
  aspiranteForm!: FormGroup;
  selectedAspirante: any;
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
    {label:"A +",id:1},
    {label:"A -",id:2},
    {label:"B +",id:3},
    {label:"B -",id:4},
    {label:"AB +",id:5},
    {label:"AB -",id:6},
    {label:"O +",id:7},
    {label:"O - ",id:8},
  ]

  NivelEducativo: any[] = [
    {label:"Basica Primaria",id:1},
    {label:"Basica Secundaria",id:2},
    {label:"Bachiller",id:3},
    {label:"Tecnico",id:4},
    {label:"Tecnologo",id:5},
    {label:"Profesional",id:6},
    {label:"Posgrado",id:7},
  ]

                       

  constructor(
    // private aspiranteService: AspiranteService,
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
    this.loadAspirantes();
  }
  loadAspirantes() {
    // this.aspiranteService.findAll()
    //     .subscribe(aspirantes => {
    //         this.aspirantes = aspirantes;
    //    },
    //     error => {
    //         console.error('Error al cargar los aspirantes', error);
    //     }
    //  );
  }

  showDialog(state:boolean) {
    this.showForm = state;
  }

  createAspirante() {
    this.aspiranteForm.reset();
    // this.showForm = true;
    this.showDialog(true)
    this.formTitle = 'Crear Aspirante';
    this.editMode = false;
  }

  editAspirante(aspirante: any) {
    this.selectedAspirante = aspirante;
    this.aspiranteForm.patchValue(aspirante);
    this.showForm = true;
    this.formTitle = 'Editar Aspirante';
    this.editMode = true;
  }


  deleteAspirante(aspiranteId: number) {
    // this.aspiranteService.delete(aspiranteId)
    //     .subscribe(
    //         () => {
    //            this.loadAspirantes();
    //             console.log('Aspirante eliminado');
    //        },
    //         error => {
    //          console.error('Error al eliminar el aspirante', error);
    //        }
    //  );
  }
  onSubmit() {

    // if (this.aspiranteForm.valid) {
    //     if (this.editMode) {
    //         this.aspiranteService.update(this.selectedAspirante.AspiranteEmpleadoId, this.aspiranteForm.value)
    //             .subscribe(
    //                 () => {
    //                    this.loadAspirantes();
    //                    this.showForm = false;
    //                     console.log('Aspirante actualizado');
    //                 },
    //                 error => {
    //                   console.error('Error al actualizar el aspirante', error);
    //               }
    //             );
    //     }
    //     else {
    //            this.aspiranteService.create(this.aspiranteForm.value)
    //               .subscribe(
    //                     () => {
    //                     this.loadAspirantes();
    //                     this.showForm = false;
    //                     console.log('Aspirante creado');
    //                   },
    //                    error => {
    //                      console.error('Error al crear el aspirante', error);
    //                  }
    //              );
    //       }
    // }
  }
}
