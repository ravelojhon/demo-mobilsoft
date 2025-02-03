import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private ordenes = [
    { id: 1, nombre: 'Juan Pérez', documento: '12345', fechaOrden: new Date(), medico: 'Dr. López', motivo: 'Examen físico', resultado: 'Aprobado', comentarios: 'Ninguno' },
    { id: 2, nombre: 'María García', documento: '67890', fechaOrden: new Date(), medico: 'Dr. Martínez', motivo: 'Chequeo general', resultado: 'Pendiente', comentarios: 'Requiere análisis de sangre' }
  ];

  constructor() { }

  crearOrden(orden: any): Observable<any> {
    const newOrden = { ...orden, id: this.ordenes.length + 1, fechaOrden: new Date() };
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
