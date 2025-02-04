import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Select, SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { HistoriaClinicaService } from './historia-clinica.service';
import { HistoriaClinica } from './historia-clinica.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-historia-clinica',
  standalone: true,
 imports: [CommonModule,FormsModule, ReactiveFormsModule, DialogModule,
    SelectModule, InputTextModule, ButtonModule, TableModule, CardModule],
    providers: [MessageService],
  templateUrl: './historia-clinica.component.html',
  styleUrl: './historia-clinica.component.css'
})
export class HistoriaClinicaComponent {
  historiaClinicaForm!: FormGroup;
  showForm: boolean = false;
  formTitle: string = '';
  selectedHistoriaClinica: HistoriaClinica | null = null;
  historiasClinicas: HistoriaClinica[] = [];

  constructor(
    private fb: FormBuilder,
    private historiaClinicaService: HistoriaClinicaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.obtenerHistoriasClinicas();
  }

  // Inicialización del formulario reactivo
  initForm() {
    this.historiaClinicaForm = this.fb.group({
      orden_id: [null, Validators.required],
      fecha_examen: ['', Validators.required],
      tipo_examen: ['', Validators.required],
      dependencia: ['', Validators.required],
      cargo: ['', Validators.required],
      eps: ['', Validators.required],
      afp: ['', Validators.required],
      patologicos: [false],
      quirurgicos: [false],
      traumaticos: [false],
      enfermedades_laborales: [''],
      consumo_cigarrillo: [''],
      consumo_alcohol: [''],
      consumo_psicoactivas: [''],
      actividad_fisica: [''],
      antecedentes_familiares: [''],
      antecedentes_ocupacionales: [''],
      frecuencia_cardiaca: [null],
      frecuencia_respiratoria: [null],
      tension_arterial: [''],
      saturacion_oxigeno: [null],
      peso: [null],
      talla: [null],
      imc: [null],
      apto_cargo: [false],
      diagnostico: [''],
      hallazgos_fisicos: [''],
      hallazgos_dermatologicos: [''],
      marcha: [''],
      movimiento_mmss: [''],
      movimiento_mmii: [''],
      movimiento_columna: [''],
      fuerza: [''],
      flexibilidad: [''],
      hallazgos_vestibular: [''],
      vacuna_tetanos: [''],
      vacuna_hepatitis: [''],
      vacuna_covid: [''],
      lateralidad: [''],
      organos_sentidos: [false],
      cardiovascular: [false],
      respiratorio: [false],
      gastrointestinal: [false],
      osteomuscular: [false],
      otros_sintomas: [''],
      apto_restricciones: [false],
      aplazado: [false],
      reintegro_sin_restr: [false],
      reintegro_con_restr: [false],
      recomendaciones_restricciones: [''],
      programas_vigilancia: [''],
      nombre_profesional: [''],
      documento_profesional: [''],
      registro_profesional: [''],
      licencia_salud: ['']
    });
  }

  // Obtener historias clínicas desde el servicio
  obtenerHistoriasClinicas() {
    this.historiaClinicaService.obtenerHistoriasClinicas().subscribe(
      (data) => {
        this.historiasClinicas = data;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar las historias clínicas.' });
      }
    );
  }

  // Abrir el formulario para crear una nueva historia clínica
  createHistoriaClinica() {
    this.formTitle = 'Crear Historia Clínica';
    this.showForm = true;
    this.historiaClinicaForm.reset();
    this.selectedHistoriaClinica = null;
  }

  // Abrir el formulario para editar una historia clínica existente
  editarHistoriaClinica(historia: HistoriaClinica) {
    this.formTitle = 'Editar Historia Clínica';
    this.showForm = true;
    this.selectedHistoriaClinica = historia;
    this.historiaClinicaForm.patchValue(historia);
  }

  // Guardar o actualizar una historia clínica
  guardarHistoriaClinica() {
    if (this.historiaClinicaForm.valid) {
      const historia = this.historiaClinicaForm.value;

      if (this.selectedHistoriaClinica) {
        // Editar historia clínica existente
        this.historiaClinicaService.editarHistoriaClinica(this.selectedHistoriaClinica.id!, historia).subscribe(
          (updatedHistoria) => {
            this.showForm = false;
            this.obtenerHistoriasClinicas();
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Historia Clínica actualizada.' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la historia clínica.' });
          }
        );
      } else {
        // Crear nueva historia clínica
        this.historiaClinicaService.crearHistoriaClinica(historia).subscribe(
          (newHistoria) => {
            this.showForm = false;
            this.obtenerHistoriasClinicas();
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Historia Clínica creada.' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la historia clínica.' });
          }
        );
      }
    }
  }

  // Eliminar una historia clínica
  eliminarHistoriaClinica(id: number) {
    this.historiaClinicaService.eliminarHistoriaClinica(id).subscribe(
      () => {
        this.obtenerHistoriasClinicas();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Historia Clínica eliminada.' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la historia clínica.' });
      }
    );
  }

  // Cerrar el modal del formulario
  closeForm() {
    this.showForm = false;
  }
}