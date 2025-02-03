import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Select, SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PrestadorService } from './prestador.service';


@Component({
  selector: 'app-prestadores',
   imports: [CommonModule,FormsModule, ReactiveFormsModule, DialogModule,
      SelectModule, InputTextModule, ButtonModule, TableModule, CardModule],
  templateUrl: './prestadores.component.html',
  styleUrl: './prestadores.component.css'
})
export class PrestadoresComponent {
  prestadorForm!: FormGroup;
  showForm: boolean = false;
  formTitle: string = 'Crear Prestador';
  editMode: boolean = false;
  prestadores: any[] = [];
  selectedPrestador: any;

  constructor(
    private fb: FormBuilder,
    private prestadorService: PrestadorService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.cargarPrestadores();
  }

  // Inicializamos el formulario reactivo
  initializeForm() {
    this.prestadorForm = this.fb.group({
      nombre: ['', Validators.required],
      especialidad: ['', Validators.required],
      documento: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Método para abrir el formulario de creación de prestador
  createPrestador() {
    this.selectedPrestador = null;
    this.formTitle = 'Crear Prestador';
    this.editMode = false;
    this.prestadorForm.reset();
    this.showForm = true;
  }

  // Método para guardar el prestador
  guardarPrestador() {
    if (this.prestadorForm.valid) {
      if (this.editMode) {
        // Editar prestador
        this.prestadorService.editarPrestador(this.selectedPrestador.id, this.prestadorForm.value).subscribe((response: any) => {
          this.cargarPrestadores();
          this.showForm = false;
        });
      } else {
        // Crear nuevo prestador
        this.prestadorService.crearPrestador(this.prestadorForm.value).subscribe((response: any) => {
          this.cargarPrestadores();
          this.showForm = false;
        });
      }
    } else {
      alert('Formulario no válido');
    }
  }

  // Cargar todos los prestadores
  cargarPrestadores() {
    this.prestadorService.obtenerPrestadores().subscribe((prestadores: any[]) => {
      this.prestadores = prestadores;
    });
  }

  // Editar un prestador
  editarPrestador(prestador: any) {
    this.selectedPrestador = prestador;
    this.formTitle = 'Editar Prestador';
    this.editMode = true;
    this.prestadorForm.patchValue(prestador);
    this.showForm = true;
  }

  // Eliminar un prestador
  eliminarPrestador(prestador: any) {
    this.prestadorService.eliminarPrestador(prestador.id).subscribe(() => {
      this.cargarPrestadores();
    });
  }
}