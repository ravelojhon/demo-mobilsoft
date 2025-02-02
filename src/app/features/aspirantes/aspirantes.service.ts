import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development'; // Importamos el archivo de entorno
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AspirantesService {

  private apiUrl: string = environment.apiUrl; // Usamos la URL de la API desde el archivo de entorno

  constructor(private http: HttpClient) { }

  // Método para obtener aspirantes desde la API
  getAspirantes(): Observable<any> {
    // let dataReturn = this.http.get(`${this.apiUrl}/aspirantes`); // Ajusta la ruta según sea necesario
    // console.log(dataReturn)
    return this.http.get(`${this.apiUrl}/aspirantes`); // Ajusta la ruta según sea necesario
  }

   // Método para obtener aspirantes desde la API
   createAspirantes(data:any): Observable<any> {
    // let dataReturn = this.http.get(`${this.apiUrl}/aspirantes`); // Ajusta la ruta según sea necesario
    // console.log(dataReturn)
    return this.http.post(`${this.apiUrl}/aspirantes`,data); // Ajusta la ruta según sea necesario
  }

  editAspirantes(data:any): Observable<any> {
    // let dataReturn = this.http.get(`${this.apiUrl}/aspirantes`); // Ajusta la ruta según sea necesario
    // console.log(dataReturn)
    return this.http.patch(`${this.apiUrl}/aspirantes`,data); // Ajusta la ruta según sea necesario
  }
}