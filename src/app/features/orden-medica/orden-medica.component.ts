import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Select, SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { OrdenMedicaService } from './orden-medica.service';


@Component({
  selector: 'app-orden-medica',
  imports: [CommonModule,FormsModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule],
  templateUrl: './orden-medica.component.html',
  styleUrl: './orden-medica.component.css'
})
export class OrdenMedicaComponent {
  ordenForm!: FormGroup;
  showForm: boolean = false;
  formTitle: string = 'Crear Orden de Evaluación Médica';
  editMode: boolean = false;
  ordenes: any[] = [];
  selectedOrden: any;

  constructor(
    private fb: FormBuilder,
    private ordenService: OrdenMedicaService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.cargarOrdenes();
  }

  // Inicializamos el formulario reactivo
  initializeForm() {
    this.ordenForm = this.fb.group({
      estado_orden: ['', Validators.required],
      fecha_agendamiento: ['', Validators.required],
      especialista: ['', Validators.required],
      consultorio: ['', Validators.required],
      direccion_atencion: ['', Validators.required]
    });
  }

  // Método para abrir el formulario de creación de orden
  createOrden() {
    this.selectedOrden = null;
    this.formTitle = 'Crear Orden de Evaluación Médica';
    this.editMode = false;
    this.ordenForm.reset();
    this.showForm = true;
  }

  // Método para guardar la orden
  guardarOrden() {
    if (this.ordenForm.valid) {
      if (this.editMode) {
        // Editar orden
        this.ordenService.editarOrden(this.selectedOrden.id, this.ordenForm.value).subscribe((response: any) => {
          this.cargarOrdenes();
          this.showForm = false;
        });
      } else {
        // Crear nueva orden
        this.ordenService.crearOrden(this.ordenForm.value).subscribe((response: any) => {
          this.cargarOrdenes();
          this.showForm = false;
        });
      }
    } else {
      alert('Formulario no válido');
    }
  }

  // Cargar todas las ordenes
  cargarOrdenes() {
    this.ordenService.obtenerOrdenes().subscribe((ordenes: any[]) => {
      this.ordenes = ordenes;
    });
  }

  // Editar una orden
  editarOrden(orden: any) {
    this.selectedOrden = orden;
    this.formTitle = 'Editar Orden de Evaluación Médica';
    this.editMode = true;
    this.ordenForm.patchValue(orden);
    this.showForm = true;
  }

  // Eliminar una orden
  eliminarOrden(orden: any) {
    this.ordenService.eliminarOrden(orden.id).subscribe(() => {
      this.cargarOrdenes();
    });
  }
}
