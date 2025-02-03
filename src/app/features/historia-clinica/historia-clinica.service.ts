import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HistoriaClinica } from './historia-clinica.model';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  private historiasClinicas: HistoriaClinica[] = [
    {
      id: 1,
      orden_id: 101,
      fecha_examen: '2025-02-15',
      tipo_examen: 'Examen Médico',
      dependencia: 'Técnico',
      cargo: 'Operario',
      eps: 'SURA',
      afp: 'Colpatria',
      patologicos: false,
      quirurgicos: false,
      traumaticos: false,
      enfermedades_laborales: 'Ninguna',
      consumo_cigarrillo: 'No',
      consumo_alcohol: 'No',
      consumo_psicoactivas: 'No',
      actividad_fisica: 'Regular',
      antecedentes_familiares: 'Sin antecedentes relevantes',
      antecedentes_ocupacionales: 'Ninguno',
      frecuencia_cardiaca: 70,
      frecuencia_respiratoria: 16,
      tension_arterial: '120/80',
      saturacion_oxigeno: 98,
      peso: 75,
      talla: 1.80,
      imc: 23.1,
      apto_cargo: true,
      diagnostico: 'Apto para el cargo'
    }
  ];

  constructor() { }

  // Crear una nueva historia clínica
  crearHistoriaClinica(historia: HistoriaClinica): Observable<HistoriaClinica> {
    const newHistoria = { ...historia, id: this.historiasClinicas.length + 1 };
    this.historiasClinicas.push(newHistoria);
    return of(newHistoria);
  }

  // Editar una historia clínica existente
  editarHistoriaClinica(id: number, historia: HistoriaClinica): Observable<HistoriaClinica | null> {
    const index = this.historiasClinicas.findIndex(h => h.id === id);
    if (index !== -1) {
      this.historiasClinicas[index] = { ...this.historiasClinicas[index], ...historia };
      return of(this.historiasClinicas[index]);
    }
    return of(null); // En caso de no encontrar la historia
  }

  // Obtener todas las historias clínicas
  obtenerHistoriasClinicas(): Observable<HistoriaClinica[]> {
    return of(this.historiasClinicas);
  }

  // Eliminar una historia clínica por su id
  eliminarHistoriaClinica(id: number): Observable<void> {
    const index = this.historiasClinicas.findIndex(h => h.id === id);
    if (index !== -1) {
      this.historiasClinicas.splice(index, 1);
    }
    return of();
  }
}
