import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdenMedicaService {

  private ordenes = [
    { id: 1, estado_orden: 'Pendiente', fecha_agendamiento: '2025-02-15', especialista: 'Dr. Juan Pérez', consultorio: '101', direccion_atencion: 'Calle 123' },
    { id: 2, estado_orden: 'Aprobada', fecha_agendamiento: '2025-02-16', especialista: 'Dra. María García', consultorio: '102', direccion_atencion: 'Calle 456' }
  ];

  constructor() { }

  crearOrden(orden: any): Observable<any> {
    const newOrden = { ...orden, id: this.ordenes.length + 1 };
    this.ordenes.push(newOrden);
    return of(newOrden);
  }

  editarOrden(id: number, orden: any): Observable<any> {
    const index = this.ordenes.findIndex(o => o.id === id);
    if (index !== -1) {
      this.ordenes[index] = { ...this.ordenes[index], ...orden };
      return of(this.ordenes[index]);
    }
    return of(null);
  }

  eliminarOrden(id: number): Observable<void> {
    this.ordenes = this.ordenes.filter(o => o.id !== id);
    return of();
  }

  obtenerOrdenes(): Observable<any[]> {
    return of(this.ordenes);
  }
}