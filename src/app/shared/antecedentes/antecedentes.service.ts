import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {

  private apiUrl: string = environment.apiUrl; // Usamos la URL de la API desde el archivo de entorno
  
    constructor(private http: HttpClient) { }
  
    // Método para obtener aspirantes desde la API
    getAntecedentes(): Observable<any> {
      // let dataReturn = this.http.get(`${this.apiUrl}/aspirantes`); // Ajusta la ruta según sea necesario
      // console.log(dataReturn)
      return this.http.get(`${this.apiUrl}/antecedentes`); // Ajusta la ruta según sea necesario
    }

    getAntecedentesGineco(): Observable<any> {
      // let dataReturn = this.http.get(`${this.apiUrl}/aspirantes`); // Ajusta la ruta según sea necesario
      // console.log(dataReturn)
      return this.http.get(`${this.apiUrl}/antecedentes/gineco`); // Ajusta la ruta según sea necesario
    }
  
    //  // Método para obtener aspirantes desde la API
    //  createAspirantes(data:any): Observable<any> {
    //   // let dataReturn = this.http.get(`${this.apiUrl}/aspirantes`); // Ajusta la ruta según sea necesario
    //   // console.log(dataReturn)
    //   return this.http.post(`${this.apiUrl}/aspirantes`,data); // Ajusta la ruta según sea necesario
    // }
  
    // editAspirantes(data:any): Observable<any> {
    //   // let dataReturn = this.http.get(`${this.apiUrl}/aspirantes`); // Ajusta la ruta según sea necesario
    //   // console.log(dataReturn)
    //   return this.http.patch(`${this.apiUrl}/aspirantes`,data); // Ajusta la ruta según sea necesario
    // }
}
