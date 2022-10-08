import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Domicilio } from '../models/domicilio.models';

@Injectable({
    providedIn: 'root'
})
export class DomicilioService {

    private baseEndpoint = 'http://localhost:8082/api/v1/domicilioscontribuyente';
    private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }
    public guardar(domicilio: Domicilio): Observable<Domicilio> {
        return this.http.post<Domicilio>(this.baseEndpoint + '/guardar', domicilio, { headers: this.cabeceras });
    }
    public obtener(municipalidadId: number ,contribuyenteId: number , numeroDJ: number): Observable<Domicilio> {
        return this.http.get<Domicilio>(this.baseEndpoint + '/obtener/?municipalidadId=' + municipalidadId + '&contribuyenteNumero='
        + contribuyenteId + '&numeroDJ=' + numeroDJ);
    }
    public listar(municipalidadId: number ,contribuyenteId: number  , numeroDJ: number): Observable<Domicilio[]> {
        return this.http.get<Domicilio[]>(this.baseEndpoint + '/listar/?municipalidadId=' + municipalidadId + '&contribuyenteNumero='
        + contribuyenteId + '&numeroDJ=' + numeroDJ);
    }
}
