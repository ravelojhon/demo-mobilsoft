import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticosService {

  private apiUrl: string = environment.apiUrl; // Usamos la URL de la API desde el archivo de entorno
  
    constructor(private http: HttpClient) { }
  
    // Método para obtener aspirantes desde la API
    getDiagnosticos(): Observable<any> {
      // let dataReturn = this.http.get(`${this.apiUrl}/aspirantes`); // Ajusta la ruta según sea necesario
      // console.log(dataReturn)
      return this.http.get(`${this.apiUrl}/diagnosticos`); // Ajusta la ruta según sea necesario
    }

    getDiagnosticosByParam(param:string): Observable<any> {
      // let dataReturn = this.http.get(`${this.apiUrl}/aspirantes`); // Ajusta la ruta según sea necesario
      // console.log(dataReturn)
      return this.http.get(`${this.apiUrl}/diagnosticos/${param}`); // Ajusta la ruta según sea necesario
    }
}
