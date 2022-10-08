import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DocSustento } from '../models/docSustento.models';

@Injectable({
    providedIn: 'root'
})
export class DocumentoService {

    private baseEndpoint = 'http://localhost:8082/api/v1/docsustentos';
    private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }
    public listar(municipalidadId: number ,contribuyenteId: number  , numeroDJ: number): Observable<DocSustento[]> {

        return this.http.get<DocSustento[]>(this.baseEndpoint + '/listar/?municipalidadId=' + municipalidadId + '&contribuyenteNumero='
        + contribuyenteId + '&numeroDJ=' + numeroDJ);
    }
}
