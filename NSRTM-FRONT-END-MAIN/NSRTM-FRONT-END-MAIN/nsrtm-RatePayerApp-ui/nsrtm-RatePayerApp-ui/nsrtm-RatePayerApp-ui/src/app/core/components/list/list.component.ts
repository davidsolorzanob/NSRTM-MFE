import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common'
import { ContribuyenteService } from './../../services/contribuyente.service';
import { ContribuyenteReporte } from './../../models/contribuyenteReporte.models';
import { Contribuyente } from './../../models/contribuyente.models';
import { DocSustento } from './../../models/docSustento.models';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';


@Component({
    selector: 'app-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
    titulo = 'Relación de contribuyentes';
    isLoadingBusqueda = false;
    tipoPersonaJuridica = 2;
    isSubmited = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    contribuyente!: any;

    saludos?: string = "hola mundo korn";
    pageSizeOptions: number[] = [3, 5, 10, 25, 100];
    displayedColumns: string[] = [
        'contribuyenteNumero',
        'fechaDJ',
        'desEstadoDj',
        'apellidoPaterno',
        'descDocIdentidad',
        'numDocIdentidad',
        'usuarioCreacion',
        'fechaInscripcion',
        'terminalCreacion',
        'acciones'];
    dataSource: MatTableDataSource<ContribuyenteReporte> = new MatTableDataSource();
    classHistorico: Contribuyente[]  = [];
    @ViewChild('supportNgForm') supportNgForm!: NgForm;
    public formBusquedaContribuyente!: FormGroup;
    public formControl!: FormControl;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private service: ContribuyenteService, private formBuilder: FormBuilder) { }

    ngOnInit() {


          this.formBusquedaContribuyente = this.formBuilder.group({
            municipalidadId: ['1'],
            docIdentidadId: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            numDocIdentidad: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            contribuyenteNumero: new FormControl('', [Validators.required, Validators.maxLength(10)]),
            apellidoPaterno: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            apellidoMaterno: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            nombres: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            razonSocial: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            tipoFiltro: new FormControl('', [Validators.required]),
        });

       this.removeValidators();
        this.buscarContribuyentes();
        this.dataSource.paginator = this.paginator;

     };

     public submit() {
      this.isSubmited = true;
      if (this.formBusquedaContribuyente.valid) {
          this.currentPage = 0;
          this.buscarContribuyentes();
          this.isSubmited = false;
      }
    }

      onReset(): void {
        this.isSubmited = false;
        this.removeValidators();
        this.formBusquedaContribuyente.get('tipoFiltro')?.setValue("");
        this.supportNgForm.reset();
    }

    get f(): { [key: string]: AbstractControl } {
        return this.formBusquedaContribuyente.controls;
    }

    public myError = (controlName: string, errorName: string) => {
        return this.formBusquedaContribuyente.controls[controlName].hasError(errorName);
    }

    public removeValidators = () => {

        this.formBusquedaContribuyente.get('docIdentidadId')?.disable();
        this.formBusquedaContribuyente.get('numDocIdentidad')?.disable();
        this.formBusquedaContribuyente.get('contribuyenteNumero')?.disable();
        this.formBusquedaContribuyente.get('apellidoPaterno')?.disable();
        this.formBusquedaContribuyente.get('apellidoMaterno')?.disable();
        this.formBusquedaContribuyente.get('nombres')?.disable();
        this.formBusquedaContribuyente.get('razonSocial')?.disable();
    }

    public changeFiltro(e:any) {
        this.removeValidators();
        this.limpiar();
        this.formBusquedaContribuyente.get('tipoFiltro')?.setValue(e.value);
        this.isSubmited = false;
        switch (e.value) {
            case "2":
                console.log(this.formBusquedaContribuyente.get('contribuyenteNumero'));
                this.formBusquedaContribuyente.get('contribuyenteNumero')?.enable();
                break;
            case "3":
                this.formBusquedaContribuyente.get('docIdentidadId')?.enable();
                this.formBusquedaContribuyente.get('numDocIdentidad')?.enable();
                break;
            case "4":
                this.formBusquedaContribuyente.get('apellidoPaterno')?.enable();
                this.formBusquedaContribuyente.get('apellidoMaterno')?.enable();
                this.formBusquedaContribuyente.get('nombres')?.enable();
                break;
            case "5":
                this.formBusquedaContribuyente.get('razonSocial')?.enable();
                break;
            default:
                break;
        }
    }

    pageBusquedaChanged(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        //this.buscarContribuyentes();
    }

    public limpiar() {
        this.formBusquedaContribuyente.get('tipoFiltro')?.setValue('');
        this.formBusquedaContribuyente.get('contribuyenteNumero')?.setValue('');
        this.formBusquedaContribuyente.get('docIdentidadId')?.setValue('');
        this.formBusquedaContribuyente.get('numDocIdentidad')?.setValue('');
        this.formBusquedaContribuyente.get('apellidoPaterno')?.setValue('');
        this.formBusquedaContribuyente.get('apellidoMaterno')?.setValue('');
        this.formBusquedaContribuyente.get('nombres')?.setValue('');
        this.formBusquedaContribuyente.get('razonSocial')?.setValue('');
    }

    public buscarContribuyentes() {
        this.isLoadingBusqueda = true;
        this.service.listarPaginas(this.formBusquedaContribuyente.value, this.pageSize.toString(), (this.currentPage + 1).toString()).subscribe(p => {

            this.dataSource.data = p.data as ContribuyenteReporte[];
            setTimeout(() => {
                this.paginator.pageIndex = this.currentPage;
                this.paginator.length = p.totalRows;
            });
            this.isLoadingBusqueda = false;
        });
    }

    public descargarReporteExcel() {
        var formValue = this.formBusquedaContribuyente.value;
        var data = formValue == "" || formValue == null ? { municipalidadId: "1" } : (formValue.tipoFiltro == "" ? { municipalidadId: "1" } : this.formBusquedaContribuyente.value);
        this.service.getReporteBusquedaExcel(JSON.stringify(data)).subscribe(p => {
            let file = new Blob([p], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        });
    }

    public reporteDJ(contribuyente: Contribuyente) {
        var data = { municipalidadId: contribuyente.municipalidadId, contribuyenteNumero: contribuyente.contribuyenteNumero, numeroDJ: contribuyente.numeroDJ };
        var url = this.service.getReporteDjContribuyente(JSON.stringify(data));

        window.open(url, '_blank')?.focus();
    }

    public eliminar(contribuyente: ContribuyenteReporte): void {

        Swal.fire({
            title: 'Confirmación',
            text: `¿Usted desea eliminar a ${contribuyente.nombres}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, estoy seguro'
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.eliminar(1, contribuyente.contribuyenteNumero, contribuyente.numeroDJ).subscribe(() => {
                    this.buscarContribuyentes();
                })
                Swal.fire(
                    'Información',
                    'El registro ha sido eliminado',
                    'success'
                )
            }
        })
    }

    public printResult(): void {
        var divToPrint = document.getElementById("tblContribuyentes")?.innerHTML;
        var newWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        var gridHtml = '';
        var index = 0;
        this.dataSource.data.map(data => {
            index += 1;
            gridHtml += `<tr>
                     <td>${index}</td>
                     <td>${data.contribuyenteNumero}</td>
                     <td>${data.usuarioCreacion}</td>
                     <td>${data.tipoPersonaId == this.tipoPersonaJuridica ? data.razonSocial : data.nombreCompleto}</td>
                     <td>${data.desDocIdentidad}</td>
                     <td>${data.numDocIdentidad}</td>
                     <td>${data.desTipoMedioDeterminacion}</td>
                     <td>${data.desMedioDeterminacion}</td>
                     <td>${data.desMotivoDj}</td>
                     <td>${data.desTipoPersona}</td>
                     <td>${data.desCondicion}</td>
                     <td>${data.departamento}</td>
                     <td>${data.provincia}</td>
                     <td>${data.distrito}</td>
                     <td>${data.desDomicilio}</td>
                     <td>${data.desEstadoDj}</td>
                     <td>${data.area}</td>
                     <td>${data.usuarioCreacion}</td>
                     <td>${data.usuarioCreacion}</td>
                     <td>${data.terminalCreacion}</td>
                     <td>${data.usuarioModificacion}</td>
                     <td>${data.usuarioCreacion}</td>
                     <td>${data.terminalModificacion}</td>
                   </tr>`;
        });
        newWin?.document.open();
        newWin?.document.write(`<html>
        <head>
          <title>Imprimir</title>
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
           <style type="text/css" media="print">
              @page { size: landscape; }
            </style>
        </head>
    <body onload="window.print();window.close()">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Nro Correlativo</th>
          <th>Código</th>
          <th>Fecha de Declaración (Modificación/Registro)</th>
          <th>Nombres/Razón Social</th>
          <th>Documento de Identidad</th>
          <th>Nro documento de Identidad</th>
          <th>Tipo de medio</th>
          <th>Medio</th>
          <th>Motivo</th>
          <th>Tipo de contribuyente</th>
          <th>Condición del contribuyente</th>
          <th>Departamento</th>
          <th>Provincia</th>
          <th>Distrito</th>
          <th>Dirección Fiscal</th>
          <th>Estado</th>
          <th>Área usuaria</th>
          <th>Usuario de creación</th>
          <th>Fecha de creación</th>
          <th>Terminal de creación</th>
          <th>Usuario de modificación</th>
          <th>Fecha de modificación</th>
          <th>Terminal de modificación</th>
        </tr>
      </thead>
      <tbody>
       ${gridHtml}
      </tbody>
    </table>
    </body>
      </html>`)
        newWin?.document.close();
    }
    getHistorico(item: Contribuyente) {
        this.service.obtenerHistorico(1, item.contribuyenteNumero)
        .subscribe({
            next: (res: Contribuyente[]) => {
                console.log('Obtener historico', res);

                this.classHistorico = res;
                console.log(this.classHistorico);
                console.log('CLASS HISTORICO');

            },
            error: (error) => {
                console.error('Error: ' + error);
            },
            complete: () => {
                console.log('completo la recuperación de getHistorico');
            }
        });
    }




 }
