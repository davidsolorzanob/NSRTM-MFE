import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Condicion } from '../models/condicion.models';

@Injectable({
    providedIn: 'root'
})
export class CondicionService {

    private baseEndpoint = 'http://localhost:8082/api/v1/condicioncontribuyentes';
    private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }

    public todos(): Observable<Condicion[]> {
        return this.http.get<Condicion[]>(this.baseEndpoint + '/todos');
    }

    public listarPaginas(size: string, page: string): Observable<any> {
        var params = {
            "data": { "tipoFiltro": '', "municipalidadId": "1" },
            "size": size,
            "nroPage": page
        };
        return this.http.post<any>(this.baseEndpoint + '/listaContribuyentePaginado', params, { headers: this.cabeceras });
    }
    public ver(contribuyenteId: number): Observable<Condicion> {
        return this.http.get<Condicion>(this.baseEndpoint + '/obtener/?id=' + contribuyenteId);
    }
    public crear(contribuyente: Condicion): Observable<Condicion> {
        return this.http.post<Condicion>(this.baseEndpoint + '/crear', contribuyente, { headers: this.cabeceras });
    }
    public guardar(contribuyente: Condicion): Observable<Condicion> {
        //enviar un body
        return this.http.post<Condicion>(this.baseEndpoint + '/guardar', contribuyente, { headers: this.cabeceras });
    }
    public editar(contribuyente: Condicion): Observable<Condicion> {
        return this.http.put<Condicion>(this.baseEndpoint + '/editar', contribuyente, { headers: this.cabeceras });
    }
    public eliminar(contribuyenteId: number): Observable<void> {
        return this.http.delete<void>(this.baseEndpoint + '/eliminar/?id=' + contribuyenteId)
    }
    public filtrarPorNombre(contribuyente: Condicion): Observable<Condicion[]> {
        return this.http.post<Condicion[]>(this.baseEndpoint + '/filtrar/', contribuyente, { headers: this.cabeceras });
    }
    public obtener(municipalidadId: number ,contribuyenteId: number, numeroDJ:number): Observable<Condicion> {

        return this.http.get<Condicion>(this.baseEndpoint + '/obtener/?municipalidadId=' + municipalidadId + '&contribuyenteNumero=' + contribuyenteId  + '&numeroDJ=' + numeroDJ);
    }



}
