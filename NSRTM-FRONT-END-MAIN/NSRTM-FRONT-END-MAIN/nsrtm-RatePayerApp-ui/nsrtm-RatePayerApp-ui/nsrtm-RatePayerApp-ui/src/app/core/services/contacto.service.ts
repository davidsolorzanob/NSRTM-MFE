import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Contacto } from '../models/contacto.models';

@Injectable({
    providedIn: 'root'
})
export class ContactoService {

    private baseEndpoint = 'http://localhost:8082/api/v1/contactos';
    private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }

    public todos(): Observable<Contacto[]> {
        return this.http.get<Contacto[]>(this.baseEndpoint + '/todos');
    }
    public listarPaginas(size: string, page: string): Observable<any> {
        var params = {
            "data": { "tipoFiltro": '', "municipalidadId": "1" },
            "size": size,
            "nroPage": page
        };
        return this.http.post<any>(this.baseEndpoint + '/listaContribuyentePaginado', params, { headers: this.cabeceras });
    }

    public listar(municipalidadId: number, contribuyenteId: number, numeroDJ: number): Observable<Contacto[]> {
        return this.http.get<Contacto[]>(this.baseEndpoint + '/listar/?municipalidadId=' + municipalidadId + '&contribuyenteNumero=' + contribuyenteId + '&numeroDJ=' + numeroDJ);
    }
}
