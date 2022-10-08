import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ubigeoProvincia } from '../models/ubigeoProvincia.models';
import { Observable } from 'rxjs';
import { UbigeoDepartamento } from '../models/UbigeoDepartamento.models';
import { ubigeoDistrito } from '../models/ubigeoDistrito.models';
@Injectable({
    providedIn: 'root'
})
export class UbigeoService {

    private baseEndpoint = 'http://localhost:8085/api/v1';
    private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }
    public todos(): Observable<UbigeoDepartamento> {

        return this.http.get<UbigeoDepartamento>(this.baseEndpoint + '/departamentos');

    }
    public listarPaginas(size: string, page: string): Observable<any> {
        var params = {
            "data": { "tipoFiltro": '', "municipalidadId": "1" },
            "size": size,
            "nroPage": page
        };
        return this.http.post<any>(this.baseEndpoint + '/listaContribuyentePaginado', params, { headers: this.cabeceras });
    }
    public ver(contribuyenteId: number): Observable<UbigeoDepartamento> {
        return this.http.get<UbigeoDepartamento>(this.baseEndpoint + '/obtener/?id=' + contribuyenteId);
    }
    public verProvincia(departamentoId: number): Observable<ubigeoProvincia> {
        return this.http.get<ubigeoProvincia>(this.baseEndpoint + '/provincias/filtrarpordepartamento/?idDepartamento=' + departamentoId);
    }
    public verDistrito(departamentoId: number, provinciaId: number): Observable<ubigeoDistrito> {
        return this.http.get<ubigeoDistrito>(this.baseEndpoint + '/distritos/filtrarporprovincia/?idDepartamento=' + departamentoId + '&idProvincia='
        + provinciaId);
    }
    public crear(contribuyente: UbigeoDepartamento): Observable<UbigeoDepartamento> {
        return this.http.post<UbigeoDepartamento>(this.baseEndpoint + '/crear', contribuyente, { headers: this.cabeceras });
    }
    public guardar(contribuyente: UbigeoDepartamento): Observable<UbigeoDepartamento> {
        return this.http.post<UbigeoDepartamento>(this.baseEndpoint + '/guardar', contribuyente, { headers: this.cabeceras });
    }
    public editar(contribuyente: UbigeoDepartamento): Observable<UbigeoDepartamento> {
        return this.http.put<UbigeoDepartamento>(this.baseEndpoint + '/editar', contribuyente, { headers: this.cabeceras });
    }
    public eliminar(contribuyenteId: number): Observable<void> {
        return this.http.delete<void>(this.baseEndpoint + '/eliminar/?id=' + contribuyenteId)
    }
    public filtrarPorNombre(contribuyente: UbigeoDepartamento): Observable<UbigeoDepartamento[]> {
        return this.http.post<UbigeoDepartamento[]>(this.baseEndpoint + '/filtrar/', contribuyente, { headers: this.cabeceras });
    }
}
