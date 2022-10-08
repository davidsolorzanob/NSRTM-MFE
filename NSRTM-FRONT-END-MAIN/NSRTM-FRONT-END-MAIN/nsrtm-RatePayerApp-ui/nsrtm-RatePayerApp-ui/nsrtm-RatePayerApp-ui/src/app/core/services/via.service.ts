import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ubicacion } from '../models/ubicacion.models';
import { via } from '../models/via.models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ViaService {

    private baseEndpoint = 'http://localhost:8084/api/v1';

    private cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }); //la cabecera es lo que va a pasar un JSON
    constructor(private http: HttpClient) { }
    public todos(): Observable<via> {
        return this.http.get<via>(this.baseEndpoint + '/vias/listar');
    }
    public listarVias(departamentoId: number, provinciaId: number, distritoId: Number, tipoVia: number): Observable<via> {
        var params = {
            "departamentoId": departamentoId,
            "provinciaId": provinciaId,
            "distritoId": distritoId,
            "tipo": '1'
        };
        return this.http.post<any>(this.baseEndpoint + '/vias/listar', params, { headers: this.cabeceras });
    }
    public listarZona(departamentoId: number, provinciaId: number, distritoId: Number, valorTipoZonaUrbana: number): Observable<Ubicacion> {
        var params = {
            "departamentoId": departamentoId,
            "provinciaId": provinciaId,
            "distritoId": distritoId,
            "tipo": valorTipoZonaUrbana
        };
        return this.http.post<Ubicacion>(this.baseEndpoint + '/zonas/listar', params, { headers: this.cabeceras });
    }
    public listarSubZona(departamentoId: number, provinciaId: number, distritoId: Number, valorSubZonaUrbana: number): Observable<Ubicacion> {
        var params = {
            "departamentoId": departamentoId,
            "provinciaId": provinciaId,
            "distritoId": distritoId,
            "tipo": valorSubZonaUrbana
        };
        return this.http.post<Ubicacion>(this.baseEndpoint + '/zonas/listarSubZona', params, { headers: this.cabeceras });
    }
    public listarEdificacion(departamentoId: number, provinciaId: number, distritoId: Number, tipoEdificacion: number): Observable<Ubicacion> {
        var params = {
            "departamentoId": departamentoId,
            "provinciaId": provinciaId,
            "distritoId": distritoId,
            "tipo": tipoEdificacion
        };
        return this.http.post<Ubicacion>(this.baseEndpoint + '/edificaciones/listar', params, { headers: this.cabeceras });
    }
}
