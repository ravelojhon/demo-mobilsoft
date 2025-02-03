import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  private prestadores = [
    { id: 1, nombre: 'Dr. Juan Pérez', especialidad: 'Cardiólogo', documento: '12345', telefono: '3001234567', direccion: 'Calle 123', email: 'juan.perez@email.com' },
    { id: 2, nombre: 'Dra. María García', especialidad: 'Pediatra', documento: '67890', telefono: '3009876543', direccion: 'Calle 456', email: 'maria.garcia@email.com' }
  ];

  constructor() { }

  crearPrestador(prestador: any): Observable<any> {
    const newPrestador = { ...prestador, id: this.prestadores.length + 1 };
    this.prestadores.push(newPrestador);
    return of(newPrestador);
  }

  editarPrestador(id: number, prestador: any): Observable<any> {
    const index = this.prestadores.findIndex(p => p.id === id);
    if (index !== -1) {
      this.prestadores[index] = { ...this.prestadores[index], ...prestador };
      return of(this.prestadores[index]);
    }
    return of(null);
  }

  eliminarPrestador(id: number): Observable<void> {
    this.prestadores = this.prestadores.filter(p => p.id !== id);
    return of();
  }

  obtenerPrestadores(): Observable<any[]> {
    return of(this.prestadores);
  }
}
