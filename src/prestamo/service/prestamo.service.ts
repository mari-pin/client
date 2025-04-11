import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '../../app/core/model/page/Pageable';
import { PrestamoPage } from '../model/PrestamoPage';
import { Observable } from 'rxjs';
import { Prestamo } from '../model/Prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/prestamo';


  getPrestamos(pageable:Pageable, clientId?: number, gameId?: number, date?: Date): Observable<PrestamoPage> {
    
    return this.http.post<PrestamoPage>(this.composeFindUrl(clientId, gameId, date), pageable);
  }

  savePrestamo(prestamo: Prestamo): Observable<Prestamo> {
     
    console.log(JSON.stringify(prestamo));

    const prestamoSave = {
    ...prestamo,
    initDate : this.fomatDate(prestamo.initDate),
    endDate : this.fomatDate(prestamo.endDate)
    }

    console.log(JSON.stringify(prestamoSave));
    return this.http.put<Prestamo>(this.baseUrl, prestamoSave);
  } 

  deletePrestamo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  private composeFindUrl(clientId?:number, gameId?:number, date?:Date): string {
    const params = new URLSearchParams();
    if (clientId != null) {
     params.set('clientId', clientId.toString());
    }
    if (gameId != null) {
      params.set('gameId', gameId.toString());
    }
    if (date != null) {
      params.set('date', this.fomatDate(date));
    }
    const queryString = params.toString();
    const url = `${this.baseUrl}/search?${params.toString()}`;
    
    return queryString ? url : this.baseUrl;
  }
  
  
  fomatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;

  }

}