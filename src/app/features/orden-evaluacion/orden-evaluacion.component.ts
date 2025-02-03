import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Aspirante } from '../aspirantes/aspirante.model';
import { OrdenService } from './orden-evaluacion.service';


import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select, SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-orden',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule],
  templateUrl: './orden-evaluacion.component.html',
  styleUrl: './orden-evaluacion.component.css',

})
export class OrdenComponent implements OnInit {
  ordenForm!: FormGroup;
  showForm: boolean = false;
  formTitle: string = 'Expedir Orden';
  editMode: boolean = false;
  ordenes: any[] = [];
  selectedOrden: any;

  constructor(
    private fb: FormBuilder,
    private ordenService: OrdenService,
  ) {
 
   }
   ngOnInit(): void {
    this.initializeForm();
    this.cargarOrdenes();
  }

  // Inicializamos el formulario reactivo
  initializeForm() {
    this.ordenForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      telefono: [''],
      direccion: [''],
      fechaOrden: ['', Validators.required],
      medico: ['', Validators.required],
      motivo: ['', Validators.required],
      resultado: [''],
      comentarios: ['']
    });
  }

  // Método para abrir el modal de creación de orden
  createOrden() {
    this.selectedOrden = null;
    this.formTitle = 'Expedir Orden para Evaluación Médica';
    this.editMode = false;
    this.ordenForm.reset();
    this.showForm = true;
  }

  // Método para guardar la orden
  guardarOrden() {
    if (this.ordenForm.valid) {
      if (this.editMode) {
        // Editar orden
        this.ordenService.editarOrden(this.selectedOrden.id, this.ordenForm.value).subscribe(response => {
          this.cargarOrdenes();
          this.showForm = false;
        });
      } else {
        // Crear nueva orden
        this.ordenService.crearOrden(this.ordenForm.value).subscribe(response => {
          this.cargarOrdenes();
          this.showForm = false;
        });
      }
    } else {
      alert('Formulario no válido');
    }
  }

  // Cargar todas las órdenes
  cargarOrdenes() {
    this.ordenService.obtenerOrdenes().subscribe(ordenes => {
      this.ordenes = ordenes;
    });
  }

  // Editar una orden
  editarOrden(orden: any) {
    this.selectedOrden = orden;
    this.formTitle = 'Editar Orden';
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