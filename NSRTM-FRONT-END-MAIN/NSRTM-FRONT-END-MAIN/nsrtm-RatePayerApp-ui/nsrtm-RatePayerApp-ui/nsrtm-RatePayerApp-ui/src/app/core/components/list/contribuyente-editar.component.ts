import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Maestro } from '../../models/maestro.models';
import { Condicion } from '../../models/condicion.models'
import { Domicilio } from '../../models/domicilio.models';
import { ContribuyenteService } from '../../services/contribuyente.service';
import { CondicionService } from '../../services/condicion.service';
import { DomicilioService } from '../../services/domicilio.service';
import { ContactoService } from '../../services/contacto.service';
import { DocumentoService } from '../../services/documento.service';
import { MaestroService } from '../../services/maestro.service';
import { Contribuyente } from '../../models/contribuyente.models';
import { via } from '../../models/via.models';
import { Ubicacion } from '../../models/ubicacion.models';
import { UbigeoService } from '../../services/ubigeo.service';
import { ViaService } from '../../services/via.service';
import { RelacionadoService } from '../../services/relacionado.service';
import { UbigeoDepartamento } from '../../models/UbigeoDepartamento.models';
import { ubigeoProvincia } from '../../models/ubigeoProvincia.models';
import { ubigeoDistrito } from '../../models/ubigeoDistrito.models';
import { Relacionado } from '../../models/relacionado.models';
import { Contacto } from '../../models/contacto.models'
import Swal from 'sweetalert2';
import { first } from 'rxjs';
import { relativeTimeThreshold } from 'moment';
import { DocSustento } from '../../models/docSustento.models';

@Component({
    selector: 'app-contribuyente-editar',
    templateUrl: './contribuyente-editar.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 90px 90px 90px;

                @screen sm {
                    grid-template-columns: 84px 48px 40px;
                }

                @screen md {
                    grid-template-columns: 84px 84px 112px;
                }

                @screen lg {
                    grid-template-columns: 94px 94px 84px 384px 184px 184px 184px 84px 84px;
                }
            }
            .demo-table {
                width: 100%;
              }

              .mat-row .mat-cell {
                border-bottom: 1px solid transparent;
                border-top: 1px solid transparent;
                cursor: pointer;
              }

              .mat-row:hover .mat-cell {
                border-color: currentColor;
                background-color: #ef4444;

              }

              .demo-row-is-clicked {
                font-weight: bold;
              }
        `

    ]
})
export class ContribuyenteEditarComponent implements OnInit {
    public verticalStepperForm!: FormGroup;
    contribuyente: Contribuyente = new Contribuyente();
    loading = false;
    contribuyentes!: Contribuyente[];
    maestrosTipoMedio: Maestro[] = [];
    maestrosMedio: Maestro[] = [];
    maestrosMotivo: Maestro[] = [];
    maestrosModalidadOficio: Maestro[] = [];
    maestrosTipoContribuyente: Maestro[] = [];
    maestrosTipoDocumento: Maestro[] = [];

    //Domicilio

    maestrosDepartamento: Maestro[] = [];
    maestrosProvincia: Maestro[] = [];
    maestrosDistrito: Maestro[] = [];
    maestrosTipoDomicilio: Maestro[] = [];
    maestrosTipoVia: Maestro[] = [];
    maestrosTipoZonaUrbana: Maestro[] = [];
    maestrosTipoSubZona: Maestro[] = [];
    maestrosEdificacion: Maestro[] = [];
    maestrosInterior: Maestro[] = [];
    maestrosEstadoDj: Maestro[] = [];
    maestrosEstadoCivil: Maestro[] = [];
    maestrosCondicionTipoContribuyente: Maestro[] = [];
    maestrosCondicionConcursalTipo: Maestro[] = [];
    maestroEstadoRegistroCondicion: Maestro[] = [];
    maestroTipoVias: Maestro[] = [];
    maestroTipoPredio: Maestro[] = [];
    maestroTipoPredio_Sin_Fiscal : Maestro[] = [];
    maestroTipoPredio_Fiscal : Maestro[] = [];
    maestroTipoDomicilio: Maestro[] = [];
    maestroTipoRelacion: Maestro[] = [];
    maestroDocumentoTipo: Maestro[] = [];
    maestrosTipoContacto: Maestro[] = [];
    maestrosTipoMedioContacto: Maestro[] = [];
    maestrosFormaPresentacion: Maestro[] = [];
    maestrosTipoDocSustento: Maestro[] = [];

    //classContacto: Contacto[] = [];

    classDomicilio: Domicilio[] = [];
    classDocSustento: DocSustento[] = [];
    classContacto: Contacto[] = [];


    ubigeo: UbigeoDepartamento[] = [];
    ubigeoProvincia: ubigeoProvincia[] = [];
    ubigeoDistrito: ubigeoDistrito[] = [];
    listaVias: via[] = [];
    listaZonas: Ubicacion[] = [];
    listaSubZona: Ubicacion[] = [];
    listaNombreEdificacion: Ubicacion[] = [];
    listarZonaUrbana: Ubicacion[] = [];
    //Condición
    valorDepartamento!: number;
    valorProvincia!: number;
    valorDistrito!: number;
    valorTipoVia!: number;
    valorTipoZonaUrbana!: number;
    valorTipoSubZonaUrbana!: number;
    valorTipoEdificacion!: number;
    //Contacto

    listaContacto: Contacto[] = [];
    listaDomicilios: Domicilio[] = [];
    listaDomiciliosAdicional: Domicilio[] = [];
    objectDomicilio!: Object;
    listaDocumentos: DocSustento[] = [];

    error: any;
    idGeneral!: number;
    numberDJ!: number;

    //contadores de listas temporales

    countClassContacto: number = 0;
    indexClassContacto: number = -1;
    indexClassDomicilio: number = -1;
    indexClassDocSustento: number = -1;

    ModoEdicionContacto = 0;
    ModoEdicionDomicilio = 0;

    muniId = "1";
    terminal = "192.138.120.142";
    userEdicion = 2025;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private contribuyenteService: ContribuyenteService,
        private formBuilder: FormBuilder,
        private serviceMaestro: MaestroService,
        private CondicionService: CondicionService,
        private DomicilioService: DomicilioService,
        private serviceUbigeo: UbigeoService,
        private serviceVia: ViaService,
        private serviceRelacionado: RelacionadoService,
        private serviceContacto: ContactoService,
        private DocumentoService: DocumentoService,

    ) { }




    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        const dj = this.activatedRoute.snapshot.paramMap.get('dj');
        console.log('id', id);
        console.log('dj', dj);
        this.idGeneral = (Number)(this.activatedRoute.snapshot.paramMap.get('id'));
        this.numberDJ = (Number)(this.activatedRoute.snapshot.paramMap.get('dj'));


        this.maestroGenerico(3, 'maestrosMedio', 0);
        this.maestroGenerico(2, 'maestrosTipoMedio', 0);
        this.maestroGenerico(4, 'maestrosMotivo', 0);
        this.maestroGenerico(12, 'maestrosModalidadOficio', 0);
        this.maestroGenerico(14, 'maestrosTipoContribuyente', 0);
        this.maestroGenerico(1, 'maestrosTipoDocumento', 0);
        this.maestroGenerico(19, 'maestrosEstadoDj', 0);
        this.maestroGenerico(17, 'maestrosEstadoCivil', 0);
        this.maestroGenerico(8, 'maestrosEdificacion', 0);
        this.maestroGenerico(9, 'maestrosInterior', 0);
        this.maestroGenerico(7, 'maestrosTipoVia', 0);
        this.maestroGenerico(5, 'maestrosCondicionTipoContribuyente', 1);
        this.maestroGenerico(6, 'maestrosCondicionConcursalTipo', 1);
        this.maestroGenerico(20, 'maestroEstadoRegistroCondicion', 0)
        this.maestroGenerico(21, 'maestroTipoVias', 0);
        this.maestroGenerico(22, 'maestrosTipoZonaUrbana', 0);
        this.maestroGenerico(23, 'maestrosTipoSubZona', 0);
        this.maestroGenerico(13, 'maestroTipoPredio', 0);
        this.maestroGenerico(10, 'maestroTipoRelacion', 0);
        this.maestroGenerico(18, 'maestroDocumentoTipo', 1);
        this.maestroGenerico(15, 'maestrosTipoContacto', 0);
        this.maestroGenerico(16, 'maestrosTipoMedioContacto', 0);
        this.maestroGenerico(24, 'maestrosTipoDocSustento', 0);
        this.maestroGenerico(25, 'maestrosFormaPresentacion', 0);
        this.maestroDepartamento();
       // Vertical stepper form
        this.verticalStepperForm = this.formBuilder.group({
            step1: this.formBuilder.group({
                contribuyenteNumero: [{ value: '' }],
                numeroDJ: [{ value: '' }],
                fechaDJ: [''],
                tipoMedioDeterminacionId: [''],
                medioDeterminacionId: [''],
                motivoDjId: ['', [Validators.required]],
                modalidadOficio: [''],
                tipoPersonaId: ['',],
                docIdentidadId: ['', [Validators.required]],
                numDocIdentidad: ['', [Validators.required]],
                fechaInscripcion: [''],
                fechaNacimiento: [''],
                estadoDjId: [''],
                apellidoPaterno: this.formBuilder.control('', Validators.required),
                apellidoMaterno: ['', [Validators.required]],
                nombres: ['', [Validators.required]],
                estadoCivil: [''],
                fallecido: [{ value: '', disabled: true }, [Validators.required]],
                fechaFallecimiento: [{ value: '', disabled: true }],
                razonSocial: [''],
                segContribuyenteId: [{ value: '', disabled: true }],
                usuarioCreacion: this.userEdicion,
                terminalCreacion: this.terminal,
                municipalidadId: this.muniId,
            }),
            step2: this.formBuilder.group({
                tipoCondicionInafectacionId: ['', [Validators.required]],
                tipoCondicionConcursalId: ['0', [Validators.required]],
                tipoDocumentoId: ['', [Validators.required]],
                desDocumento: ['', [Validators.required]],
                numeroDocumento: ['', [Validators.required]],
                fechaDocumento: ['', [Validators.required]],
                fechaVigenciaInicial: ['', [Validators.required]],
                fechaVigenciaFinal: ['', [Validators.required]],
                importePension: ['', [Validators.required]],
                estadoId: ['', [Validators.required]],
                numeroLicencia: ['', [Validators.required]],
                numeroExpediente: ['', [Validators.required]],
                fechaExpediente: ['', [Validators.required]],
                usuarioCreacion: this.userEdicion,
                terminalCreacion: this.terminal,
                municipalidadId: this.muniId,
                "conContribuyenteId": null,
                contribuyenteNumero: [''],
            }),
            step3: this.formBuilder.group({
                municipalidadId: this.muniId,
                domContribuyenteDomicilioNumero: null,
                departamentoId: ['', [Validators.required]],
                provinciaId: ['', [Validators.required]],
                distritoId: ['', [Validators.required]],
                tipoPredioId: ['', [Validators.required]],
                descripcionDepartamentoId: [''],
                descripcionProvinciaId: [''],
                descripcionDistritoId: [''],
                viaDepartamentoId: ['15'],
                viaProvinciaId: ['135'],
                viaDistritoId: ['121'],
                 tipoViaId: ['', [Validators.required]],
                desTipoPredioId: '',

                viaId: ['', [Validators.required]],  // buscador SELECT 2
                numero1: ['', [Validators.maxLength(5)]],
                letra1: ['', [Validators.maxLength(5)]],
                numero2: ['', [Validators.maxLength(6)]],
                letra2: ['', [Validators.maxLength(6)]],
                manzana: ['', [Validators.maxLength(6)]],
                lote: ['', [Validators.maxLength(6)]],
                subLote: ['', [Validators.maxLength(6)]],
                zonaUrbanaId: [''], // buscador SELECT 2
                  subZonaUrbanaId: [''],  // buscador SELECT 2
                edificacionId: [''],  // buscador SELECT 2
               tipoInteriorId: [''], // buscador SELECT 2
                ingreso: ['', [Validators.maxLength(6)]],
                piso: ['', [Validators.maxLength(6)]],
                kilometro: ['', [Validators.maxLength(6)]],
                referencia: ['', [Validators.maxLength(100)]],
                latitud: [''],
                longitud: [''],
                usuarioCreacion: [''],
                terminalCreacion: [''],
                tipoZonaUrbanaId: ['', [Validators.required]],
                tipoEdificacionId: ['', [Validators.required]],

            }), //otros domicilios
            step4: this.formBuilder.group({
                municipalidadId: this.muniId,
                domContribuyenteDomicilioNumero: null,
                departamentoId: ['', [Validators.required]],
                provinciaId: ['', [Validators.required]],
                distritoId: ['', [Validators.required]],
                tipoPredioId: ['', [Validators.required]],
                 desDepartamento: [''],
                desProvincia: [''],
                desDistrito: [''],
                viaDepartamentoId: ['15'],
                viaProvinciaId: ['135'],
                viaDistritoId: ['121'],
                fechaRegistro: [''],
                tipoViaId: ['', [Validators.required]],
                desTipoPredio: '',
                viaId: ['', [Validators.required]],  // buscador SELECT 2
                numero1: ['', [Validators.maxLength(5)]],
                letra1: ['', [Validators.maxLength(5)]],
                numero2: ['', [Validators.maxLength(6)]],
                letra2: ['', [Validators.maxLength(6)]],
                manzana: ['', [Validators.maxLength(6)]],
                lote: ['', [Validators.maxLength(6)]],
                subLote: ['', [Validators.maxLength(6)]],
                zonaUrbanaId: [''], // buscador SELECT 2
                subZonaUrbanaId: [''],  // buscador SELECT 2
               edificacionId: [''],  // buscador SELECT 2
                tipoInteriorId: [''], // buscador SELECT 2
                ingreso: ['', [Validators.maxLength(6)]],
                piso: ['', [Validators.maxLength(6)]],
                kilometro: ['', [Validators.maxLength(6)]],
                referencia: ['', [Validators.maxLength(100)]],
                latitud: [''],
                longitud: [''],
                usuarioCreacion: [''],
                terminalCreacion: [''],
                tipoZonaUrbanaId: ['', [Validators.required]],
                tipoEdificacionId: ['', [Validators.required]],

            }) //Relacionado
            ,
            step5: this.formBuilder.group({
                relContribuyenteNumero: null,
                personaId: null,
                docIdentidadId: ['', [Validators.required]],
                numDocIdentidad: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
                apellidoPaterno: ['', [Validators.required]],
                apellidoMaterno: ['', [Validators.required]],
                nombres: ['', [Validators.required]],
                razonSocial: ['', [Validators.required]],
                fechaVigenciaInicialRela: ['', [Validators.required]],
                fechaVigenciaFinalRela: ['', [Validators.required]],
                tipoRelacionadoId: ['', [Validators.required]],
                estadoId: "1",
                domicilioRelacionadoNumero: null,
                departamentoId: ['', [Validators.required]],
                provinciaId: ['', [Validators.required]],
                distritoId: ['', [Validators.required]],
                tipoPredioId: ['', [Validators.required]],
                desTipoPredioId: '',
                viaDepartamentoId: ['15'],
                viaProvinciaId: ['135'],
                tipoViaId: ['', [Validators.required]],
                viaDistritoId: ['121'],
                viaId: ['', [Validators.required]],  // buscador SELECT 2
                numero1: ['', [Validators.maxLength(5)]],
                letra1: ['', [Validators.maxLength(5)]],
                numero2: ['', [Validators.maxLength(6)]],
                letra2: ['', [Validators.maxLength(6)]],
                manzana: ['', [Validators.maxLength(6)]],
                lote: ['', [Validators.maxLength(6)]],
                subLote: ['', [Validators.maxLength(6)]],
                zonaUrbanaId: [''], // buscador SELECT 2
                subZonaUrbanaId: [''],  // buscador SELECT 2
                edificacionId: [''],  // buscador SELECT 2
                 tipoInteriorId: [''], // buscador SELECT 2
                ingreso: ['', [Validators.maxLength(6)]],
                piso: ['', [Validators.maxLength(6)]],
                kilometro: ['', [Validators.maxLength(6)]],
                referencia: ['', [Validators.maxLength(100)]],
                usuarioCreacion: this.userEdicion,
                terminalCreacion: this.terminal,
                municipalidadId: this.muniId,
                "conContribuyenteId": null,
                tipoZonaUrbanaId: ['', [Validators.required]],
                contribuyenteNumero: [''],
            }),


            step6: this.formBuilder.group({
                contribuyenteNumero: [''],
                contactoContribuyenteId: null,
                tipoMedioContactoId: ['', [Validators.required]],
                claseMedioContactoId: ['', [Validators.required]],
                desTipoMedioContacto: ['', [Validators.required]],
                desClaseMedioContacto: ['', [Validators.required]],
                principal: "1",
               estadoId: "1",
                usuarioCreacion: this.userEdicion,
                terminalCreacion: this.terminal,
                municipalidadId: this.muniId,
               desMedioContacto: ['', [Validators.required]],
            }),

            step7: this.formBuilder.group({
                 docSustentoId: null,
                tipoDocSustentoId: ['', [Validators.required]],
                nroDocSustento: ['', [Validators.required]],
                tipoFormaPresentacionId: ['', [Validators.required]],
                folios: ['', [Validators.required]],
                desTipoDocSustento: [''],
                desTipoFormaPresentacion: [''],
                activo: 1,
                usuarioCreacion: this.userEdicion,
                terminalCreacion: this.terminal,
                municipalidadId: this.muniId
            })

        });

    }

    ngAfterViewInit() {
        this.cargarContribuyente(this.idGeneral);
        this.cargarContribuyenteCondicion(this.idGeneral);
        this.cargarContribuyenteDomicilio(this.idGeneral);
        this.cargarContribuyenteDomicilioAdicional(this.idGeneral);

        this.cargarContribuyenteRelacionado(this.idGeneral);
        this.cargarContactoContribuyente(this.idGeneral);
        this.cargarDocumentoSustentoContribuyente(this.idGeneral);
    }

    public errorValidator = (step: string, controlName: string, errorName: string) => {
        return this.verticalStepperForm.get(step)!.get(controlName)!.hasError(errorName);
    }

    // Adicionar Sustento
    addDocSustento() {
       if (this.verticalStepperForm.get("step7")!.valid) {
            let idTipoDoc = this.valueControlStep("step7", "tipoDocSustentoId");
            let idForma = this.valueControlStep("step7", "tipoFormaPresentacionId");
            let dataTipoDoc = this.maestrosTipoDocSustento.find(o => o.maestroId === idTipoDoc);
            let dataForma = this.maestrosFormaPresentacion.find(o => o.maestroId === idForma);

            this.verticalStepperForm.get('step7')!.get('desTipoDocSustento')!.setValue(dataTipoDoc!.descripcion);
            this.verticalStepperForm.get('step7')!.get('desTipoFormaPresentacion')!.setValue(dataForma!.descripcion);

            if (this.indexClassDocSustento == -1) {
                this.classDocSustento.push(this.verticalStepperForm.get('step7')!.value);
            }
            else {
                this.classDocSustento.splice(this.indexClassDocSustento, 1);
                this.classDocSustento.splice(this.indexClassDocSustento, 0, this.verticalStepperForm.get('step7')!.value);
                this.indexClassDocSustento = -1;
            }
            this.resetFormDocSustento();
        }
    }

    public valueControlStep = (step: string, controlName: string) => {
        return this.verticalStepperForm.get(step)!.get(controlName)!.value;
    }
    // Editar Sustento
    editarDocSustento(lessonIndex: number, sustento: DocSustento) {
        this.verticalStepperForm.get('step7')!.patchValue(sustento);
        this.indexClassDocSustento = lessonIndex;
     }

    eliminarDocSustento(lessonIndex: number) {
        this.classDocSustento.splice(lessonIndex, 1);
    }


    public resetFormDocSustento() {
        this.verticalStepperForm.get('step7')!.get('tipoDocSustentoId')!.setValue("");
        this.verticalStepperForm.get('step7')!.get('nroDocSustento')!.setValue("");
        this.verticalStepperForm.get('step7')!.get('tipoFormaPresentacionId')!.setValue("");
        this.verticalStepperForm.get('step7')!.get('folios')!.setValue("");

        this.verticalStepperForm.get('step7')!.get('tipoDocSustentoId')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step7')!.get('nroDocSustento')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step7')!.get('tipoFormaPresentacionId')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step7')!.get('folios')!.updateValueAndValidity({ emitEvent: false });
    }

    public changeTipoDocSustento(e: any) {
        this.verticalStepperForm.get('step7')!.get('tipoDocSustentoId')!.setValue(e.value);
    }



    validacionTipoDocumento(evento: number) {
        if (evento == 1) {
            console.log(evento);
            this.verticalStepperForm.get('step1')!.get('numDocIdentidad')!.setValidators(Validators.pattern('[0-9]{8}'));
        } else {

            console.log(evento);
            //this.verticalStepperForm.get('step1')!.get('numDocIdentidad').clearValidators();
            this.verticalStepperForm.get('step1')!.get('numDocIdentidad')!.setValidators(Validators.pattern('[0-9]{15}'));
        }

    }

    getUbigeo(distritoId: number) {

        let indiceDistrito = distritoId;
        let indiceDepartamento = this.verticalStepperForm.get('step4')!.get('departamentoId')!.value;
        let indiceProvincia = this.verticalStepperForm.get('step4')!.get('provinciaId')!.value;

        const filterDepartamento = this.ubigeo.filter((item) => item.departamentoId == indiceDepartamento);
        const filterProvincia = this.ubigeoProvincia.filter((item) => item.provinciaId == indiceProvincia);
        const filterDistrito = this.ubigeoDistrito.filter((item) => item.distritoId == indiceDistrito);

        console.log(indiceDepartamento);
        console.log(indiceProvincia);
        console.log(indiceDistrito);


        indiceDistrito = indiceDistrito;
        indiceDepartamento = indiceDepartamento;
        indiceProvincia = indiceProvincia - 1;


        this.verticalStepperForm.get('step4')!.get('descripcionDepartamentoId')!.setValue(filterDepartamento[0].descripcion);
        this.verticalStepperForm.get('step4')!.get('descripcionProvinciaId')!.setValue(filterProvincia[0].descripcion);
        this.verticalStepperForm.get('step4')!.get('descripcionDistritoId')!.setValue(filterDistrito[0].descripcion);
    }


    getTipoPredioId(tipoPredioId: number) {

        let indice = tipoPredioId - 1;
        this.verticalStepperForm.get('step4')!.get('desTipoPredioId')!.setValue(this.maestroTipoPredio[indice].descripcion);

    }
    //Adicionar Domicilio
    addDomicilio() {
        if (this.verticalStepperForm.get("step4")!.valid) {
            if (this.ModoEdicionDomicilio == 0) {

                let depa = this.verticalStepperForm.get('step4')!.get('departamentoId')!.value;
                let pro = this.verticalStepperForm.get('step4')!.get('provinciaId')!.value;
                let dis = this.verticalStepperForm.get('step4')!.get('distritoId')!.value;

                let depaNombre = this.ubigeo.filter((filter => filter.departamentoId == depa));
                let proNombre = this.ubigeoProvincia.filter((filter => filter.provinciaId == pro));
                let disNombre = this.ubigeoDistrito.filter((item => item.distritoId == dis));
                console.log(depa);
                console.log(pro);
                console.log(dis);

                console.log(depaNombre);
                console.log(proNombre);
                console.log(disNombre);

                this.verticalStepperForm.get('step4')!.get('desDepartamento')!.setValue(depaNombre[0].descripcion);
                this.verticalStepperForm.get('step4')!.get('desProvincia')!.setValue(proNombre[0].descripcion);
                this.verticalStepperForm.get('step4')!.get('desDistrito')!.setValue(disNombre[0].descripcion);
                this.classDomicilio.push(this.verticalStepperForm.get('step4')!.value);

                console.log(this.classDomicilio);
            }
            else {
                this.classDomicilio.splice(this.indexClassDomicilio, 1);
                this.classDomicilio.splice(this.indexClassDomicilio, 0, this.verticalStepperForm.get('step4')!.value);
                this.indexClassDomicilio = -1;
                this.ModoEdicionDomicilio = 0;
                //this.verticalStepperForm.get('step4').reset();
            }
                  this.resetFormDomicilio();
        }
    }

    resetFormDomicilio(){

        this.verticalStepperForm.get('step4')!.get('tipoPredioId')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('desDepartamento')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('desProvincia')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('desDistrito')!.setValue("");

        this.verticalStepperForm.get('step4')!.get('tipoViaId')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('desTipoPredio')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('viaId')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('departamentoId')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('numero1')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('letra1')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('numero2')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('letra2')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('manzana')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('lote')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('zonaUrbanaId')!.setValue("");
         this.verticalStepperForm.get('step4')!.get('subZonaUrbanaId')!.setValue("");
       this.verticalStepperForm.get('step4')!.get('edificacionId')!.setValue("");
       this.verticalStepperForm.get('step4')!.get('subLote')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('ingreso')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('piso')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('kilometro')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('latitud')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('longitud')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('kilometro')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('referencia')!.setValue("");
        this.verticalStepperForm.get('step4')!.get('edificacionId')!.setValue("");

        this.verticalStepperForm.get('step4')!.get('tipoPredioId')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('desDepartamento')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('desProvincia')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('desDistrito')!.updateValueAndValidity({ emitEvent: false });

        this.verticalStepperForm.get('step4')!.get('tipoViaId')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('desTipoPredio')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('viaId')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('departamentoId')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('numero1')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('letra1')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('numero2')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('letra2')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('manzana')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('lote')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('zonaUrbanaId')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('subZonaUrbanaId')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('edificacionId')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('subLote')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('ingreso')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('piso')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('kilometro')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('latitud')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('longitud')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('kilometro')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('referencia')!.updateValueAndValidity({ emitEvent: false });
        this.verticalStepperForm.get('step4')!.get('edificacionId')!.updateValueAndValidity({ emitEvent: false });

    }
    //Eliminar Domicilio
    eliminarDomicilio(lessonIndex: number) {
        console.log(lessonIndex);
        this.classDomicilio.splice(lessonIndex, 1);
    }
    // Editar Domicilio
    editDomicilio(lessonIndex: number, domicilio: Domicilio) {
        this.ModoEdicionDomicilio = 1
        this.verticalStepperForm.get('step4')!.patchValue(domicilio);
        this.indexClassContacto = lessonIndex;
        console.log(domicilio);
        console.log(this.ModoEdicionDomicilio);
    }



    maestroGenerico(tipo: number, matriz: string, municipalidadId: number) {

        this.serviceMaestro.ver(tipo, municipalidadId)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    // matriz = res;
                    if (matriz == 'maestrosTipoMedio') {
                        console.log(matriz);
                        this.maestrosTipoMedio = res;
                    }
                    if (matriz == 'maestrosMedio') {
                        console.log(matriz);
                        this.maestrosMedio = res;
                    }
                    if (matriz == 'maestrosMotivo') {
                        console.log(matriz);
                        this.maestrosMotivo = res;
                    }
                    if (matriz == 'maestrosModalidadOficio') {
                        console.log(matriz);
                        this.maestrosModalidadOficio = res;
                    }
                    if (matriz == 'maestrosTipoDocumento') {
                        console.log(matriz);
                        this.maestrosTipoDocumento = res;
                    }
                    if (matriz == 'maestrosTipoContribuyente') {
                        console.log(matriz);
                        this.maestrosTipoContribuyente = res;
                    }
                    if (matriz == 'maestrosEstadoDj') {
                        console.log(matriz + 'estado dj');
                        this.maestrosEstadoDj = res;
                    }
                    if (matriz == 'maestrosEstadoCivil') {
                        console.log(matriz);
                        this.maestrosEstadoCivil = res;
                    }
                    if (matriz == 'maestrosEdificacion') {
                        console.log(matriz);
                        this.maestrosEdificacion = res;
                    }
                    if (matriz == 'maestrosInterior') {
                        console.log(matriz);
                        this.maestrosInterior = res;
                    }
                    if (matriz == 'maestrosTipoVia') {
                        console.log(matriz);
                        this.maestrosTipoVia = res;
                    }
                    if (matriz == 'maestrosCondicionTipoContribuyente') {
                        console.log(matriz);
                        this.maestrosCondicionTipoContribuyente = res;
                    }
                    if (matriz == 'maestrosCondicionConcursalTipo') {
                        console.log(matriz);
                        this.maestrosCondicionConcursalTipo = res;
                    }
                    if (matriz == 'maestroEstadoRegistroCondicion') {
                        console.log(matriz);
                        this.maestroEstadoRegistroCondicion = res;
                    }
                    if (matriz == 'maestroTipoVias') {
                        console.log(matriz);
                        this.maestroTipoVias = res;
                    }
                    if (matriz == 'maestrosTipoZonaUrbana') {
                        console.log(matriz);
                        this.maestrosTipoZonaUrbana = res;
                    }
                    if (matriz == 'maestrosTipoSubZona') {
                        console.log(matriz);
                        this.maestrosTipoSubZona = res;
                    }
                    if (matriz == 'maestroTipoPredio') {
                        console.log(matriz);
                        console.log('maestroTipoPredio');
                        this.maestroTipoPredio = res;
                        this.maestroTipoPredio_Sin_Fiscal = this.maestroTipoPredio.filter((item) => item.descripcion != 'Fiscal');
                        this.maestroTipoPredio_Fiscal = this.maestroTipoPredio.filter((item) => item.descripcion == 'Fiscal');
                    }
                    if (matriz == 'maestroTipoRelacion') {
                        console.log(matriz);
                        this.maestroTipoRelacion = res;
                    }
                    if (matriz == 'maestroDocumentoTipo') {
                        console.log(matriz);
                        this.maestroDocumentoTipo = res;
                    }
                    if (matriz == 'maestrosTipoContacto') {
                        console.log(matriz);
                        this.maestrosTipoContacto = res;
                    }
                    if (matriz == 'maestrosTipoMedioContacto') {
                        console.log(matriz);
                        this.maestrosTipoMedioContacto = res;
                    }
                    if (matriz == 'maestrosTipoDocSustento') {
                        console.log(matriz);
                        this.maestrosTipoDocSustento = res;
                    }
                    if (matriz == 'maestrosFormaPresentacion') {
                        console.log(matriz);
                        this.maestrosFormaPresentacion = res;
                    }


                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de Motivo');
                }
            });
    }


    cargarContribuyente(id: any) {
        this.contribuyenteService.obtener(1, id, this.numberDJ)
            .subscribe({
                next: (res: Contribuyente) => {
                    console.log('DATOS CONTRIBUYENTE', res);
                    // this.verticalStepperForm.patchValue(res);
                    this.verticalStepperForm.get('step1')!.patchValue(res);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación del Contribuyente');
                }
            });
    }


    cargarContribuyenteCondicion(id: any) {

        console.log(this.numberDJ);
        console.log(id);
        console.log('valoresssss');

        this.CondicionService.obtener(1, id, this.numberDJ)
            .subscribe({
                next: (res: Condicion) => {
                    console.log('DATOS DE CONDICION CONTRIBUYENTE', res);
                     this.verticalStepperForm.get('step2')!.patchValue(res);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de la condicion del Contribuyente');
                }
            });
    }


    cargarContribuyenteDomicilio(id: any) {
        this.DomicilioService.listar(1, id, this.numberDJ)
            .subscribe({
                next: (res: Domicilio[]) => {
                    console.log('DATOS DOMICILIO DE CONTRIBUYENTE', res);

                    this.listaDomicilios = [];
                    this.listaDomicilios = res;

                    this.listaDomicilios = this.listaDomicilios.filter((item => item.tipoPredioId === 1));
                    console.log(this.listaDomicilios);

                    this.verticalStepperForm.get('step3')!.patchValue(this.listaDomicilios[0]);
                    this.valorDepartamento = this.verticalStepperForm.get('step3')!.get('departamentoId')!.value;
                    console.log(this.valorDepartamento);
                    this.maestroProvincia(this.valorDepartamento);
                    this.valorProvincia = this.verticalStepperForm.get('step3')!.get('provinciaId')!.value;
                    this.maestroDistrito(this.valorProvincia);

                    this.valorTipoVia = this.verticalStepperForm.get('step3')!.get('tipoViaId')!.value;
                    this.listarVias(this.valorTipoVia);

                    this.valorTipoZonaUrbana = this.verticalStepperForm.get('step3')!.get('tipoZonaUrbanaId')!.value;
                    this.listarNombreZonaUrbana(this.valorTipoZonaUrbana);

                    this.valorTipoSubZonaUrbana = this.verticalStepperForm.get('step3')!.get('subZonaUrbanaId')!.value;
                    this.listarSubZonaUrbana(this.valorTipoSubZonaUrbana);

                    this.valorTipoEdificacion = this.verticalStepperForm.get('step3')!.get('tipoEdificacionId')!.value;
                    this.listarEdificaciones(this.valorTipoEdificacion);


                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación deL domicilio del Contribuyente');
                }
            });
    }



    cargarContribuyenteDomicilioAdicional(id: any) {


        this.DomicilioService.listar(1, id, this.numberDJ)
            .subscribe({
                next: (res: Domicilio[]) => {
                    console.log('DATOS DOMICILIO ADICIONAL DEL CONTRIBUYENTE', res);

                    this.classDomicilio = [];
                    this.classDomicilio = res;
                    console.log(res);
                    this.classDomicilio = this.classDomicilio.filter((item => item.tipoPredioId !== 1));


                    console.log(this.classDomicilio);
                    console.log('domiciliooooooo adicional <> fiscal');

                    console.log(this.classDomicilio);

                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación deL domicilio del Contribuyente');
                }
            });

    }


    cargarContribuyenteRelacionado(id: any) {
        this.serviceRelacionado.obtener(1, id, this.numberDJ)
            .subscribe({
                next: (res: Relacionado) => {
                    console.log('DATOS DEl  RELACIONADO DEL CONTRIBUYENTE', res);
                     this.verticalStepperForm.get('step5')!.patchValue(res);

                    this.valorTipoZonaUrbana = this.verticalStepperForm.get('step5')!.get('tipoZonaUrbanaId')!.value;
                    this.listarNombreZonaUrbana2(this.valorTipoZonaUrbana);
                    this.valorTipoSubZonaUrbana = this.verticalStepperForm.get('step5')!.get('subZonaUrbanaId')!.value;
                    this.listarSubZonaUrbana2(this.valorTipoSubZonaUrbana);


                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación deL relacionado del Contribuyente');
                }
            });
    }


    cargarDocumentoSustentoContribuyente(id: any) {
        this.DocumentoService.listar(1, id, this.numberDJ)
            .subscribe({
                next: (res: DocSustento[]) => {
                    console.log('DATOS DEL DOCUMENTO SUSTENTO', res);
                    this.classDocSustento = res;
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación deL documento sustento del Contribuyente');
                }
            });
    }

    // documento sustento
    cargarContactoContribuyente(id: any) {
        this.serviceContacto.listar(1, id, this.numberDJ)
            .subscribe({
                next: (res: Contacto[]) => {
                    console.log('DATOS DEL CONTACTO DEL CONTRIBUYENTE', res);
                    this.listaContacto = res;
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación deL contacto del Contribuyente');
                }
            });
    }


    // this.serviceUbigeo.todos().subscribe(p => this.ubigeo = p);
    maestroDepartamento() {
        this.serviceUbigeo.todos()
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    // matriz = res;

                    this.ubigeo = res;
                    console.log(this.ubigeo);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de Departamento');
                }
            });
    }


    maestroProvincia(departamentoId: any) {
        console.log(departamentoId + 'depa llego');
        this.serviceUbigeo.verProvincia(departamentoId)
            .subscribe({
                next: (res: any) => {
                    console.log('Provincia limpio', res);
                    // matriz = res;

                    this.ubigeoProvincia = res;
                    console.log(this.ubigeoProvincia);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de Provincia');
                }
            });
    }

    maestroDistrito(provinciaId: any) {

        this.valorDepartamento = 15; //this.step1.get('step1')  //this.verticalStepperForm.get('step1').['departamentoId'].value;
        console.log(this.valorDepartamento + 'DEPARTAMENTO(1)');
        console.log(provinciaId + 'DEPARTAMENTO(2)');

        this.serviceUbigeo.verDistrito(this.valorDepartamento, provinciaId)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    this.ubigeoDistrito = res;
                    console.log(this.ubigeoDistrito);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de Distrito');
                }
            });
    }


    maestroDistrito2(provinciaId: any) {

        this.valorDepartamento = 15;// this.registerFormContribuyenteRelacionado.controls['departamentoId'].value;
        console.log(this.valorDepartamento + 'DEPARTAMENTO(1)');
        console.log(provinciaId + 'DEPARTAMENTO(2)');


        this.serviceUbigeo.verDistrito(this.valorDepartamento, provinciaId)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    // matriz = res;
                    // this.ubigeoDistrito = [];
                    this.ubigeoDistrito = res;
                    console.log(this.ubigeoDistrito);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de Distrito');
                }
            });
    }



    listarVias(tipoViaId: any) {

        this.valorDepartamento = 15; //this.registerFormContribuyenteDomicilio.controls['departamentoId'].value;
        this.valorProvincia = 135;//this.registerFormContribuyenteDomicilio.controls['provinciaId'].value;
        this.valorDistrito = 121;//this.registerFormContribuyenteDomicilio.controls['distritoId'].value;
        this.valorTipoVia = 1; //tipoViaId;

        console.log(this.valorDepartamento, 'depa', this.valorProvincia, 'provincia', this.valorDistrito, 'distrito', this.valorTipoVia, 'valorTipovia');

        this.serviceVia.listarVias(this.valorDepartamento, this.valorProvincia, this.valorDistrito, this.valorTipoVia)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    this.listaVias = res;
                    console.log(this.listaVias);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de listar vias');
                }
            });
    }


    listarVias2(tipoViaId: any) {

        this.valorDepartamento = 15; //this.registerFormContribuyenteRelacionado.controls['departamentoId'].value;
        this.valorProvincia = 135;//this.registerFormContribuyenteRelacionado.controls['provinciaId'].value;
        this.valorDistrito = 121;//this.registerFormContribuyenteRelacionado.controls['distritoId'].value;
        this.valorTipoVia = 1;//tipoViaId;

        console.log(this.valorDepartamento, 'depa', this.valorProvincia, 'provincia', this.valorDistrito, 'distrito', this.valorTipoVia, 'valorTipovia');

        this.serviceVia.listarVias(this.valorDepartamento, this.valorProvincia, this.valorDistrito, this.valorTipoVia)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    this.listaVias = res;
                    console.log(this.listaVias);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de listar vias');
                }
            });
    }

    listarNombreZonaUrbana(tipoZonaUrbana: any) {

        this.valorDepartamento = 15;//this.registerFormContribuyenteDomicilio.controls['departamentoId'].value;
        this.valorProvincia = 135;//this.registerFormContribuyenteDomicilio.controls['provinciaId'].value;
        this.valorDistrito = 121;//this.registerFormContribuyenteDomicilio.controls['distritoId'].value;
        this.valorTipoZonaUrbana = tipoZonaUrbana; //tipoZonaUrbana;
        console.log(this.valorDepartamento, 'depa', this.valorProvincia, 'provincia', this.valorDistrito, 'distrito', this.valorTipoZonaUrbana, 'tipozonaurbana');

        this.serviceVia.listarZona(this.valorDepartamento, this.valorProvincia, this.valorDistrito, this.valorTipoZonaUrbana)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    this.listarZonaUrbana = res;
                    console.log(this.listarZonaUrbana);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de listar zonas urbanas');
                }
            });

    }



    listarNombreZonaUrbana2(tipoZonaUrbana: any) {

        this.valorDepartamento = 15;//this.registerFormContribuyenteRelacionado.controls['departamentoId'].value;
        this.valorProvincia = 135; //this.registerFormContribuyenteRelacionado.controls['provinciaId'].value;
        this.valorDistrito = 121; //this.registerFormContribuyenteRelacionado.controls['distritoId'].value;
        this.valorTipoZonaUrbana = 1; //tipoZonaUrbana;
        console.log(this.valorDepartamento, 'depa', this.valorProvincia, 'provincia', this.valorDistrito, 'distrito', this.valorTipoZonaUrbana, 'tipozonaurbana');

        this.serviceVia.listarZona(this.valorDepartamento, this.valorProvincia, this.valorDistrito, this.valorTipoZonaUrbana)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    this.listarZonaUrbana = res;
                    console.log(this.listarZonaUrbana);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de listar zonas ');
                }
            });

    }

    listarSubZonaUrbana(SubZonaUrbana: any) {

        this.valorDepartamento = 15;// this.registerFormContribuyenteDomicilio.controls['departamentoId'].value;
        this.valorProvincia = 135;//this.registerFormContribuyenteDomicilio.controls['provinciaId'].value;
        this.valorDistrito = 121;//this.registerFormContribuyenteDomicilio.controls['distritoId'].value;
        this.valorTipoSubZonaUrbana = 1; //SubZonaUrbana;
        console.log(this.valorDepartamento, 'depa', this.valorProvincia, 'provincia', this.valorDistrito, 'distrito', this.valorTipoZonaUrbana, 'tipozonaurbana');

        this.serviceVia.listarSubZona(this.valorDepartamento, this.valorProvincia, this.valorDistrito, this.valorTipoSubZonaUrbana)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    this.listaSubZona = res;
                    console.log(this.listaSubZona);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de Sub Zona');
                }
            });
    }



    listarSubZonaUrbana2(SubZonaUrbana: any) {

        this.valorDepartamento = 15;//this.registerFormContribuyenteRelacionado.controls['departamentoId'].value;
        this.valorProvincia = 135;//this.registerFormContribuyenteRelacionado.controls['provinciaId'].value;
        this.valorDistrito = 121;//this.registerFormContribuyenteRelacionado.controls['distritoId'].value;
        this.valorTipoSubZonaUrbana = 1;//SubZonaUrbana;
        console.log(this.valorDepartamento, 'depa', this.valorProvincia, 'provincia', this.valorDistrito, 'distrito', this.valorTipoZonaUrbana, 'tipozonaurbana');

        this.serviceVia.listarSubZona(this.valorDepartamento, this.valorProvincia, this.valorDistrito, this.valorTipoSubZonaUrbana)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    this.listaSubZona = res;
                    console.log(this.listaSubZona);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de Sub Zona');
                }
            });
    }


    listarEdificaciones(tipoEdificacion: any) {

        this.valorDepartamento = 15; //this.registerFormContribuyenteDomicilio.controls['departamentoId'].value;
        this.valorProvincia = 135; //this.registerFormContribuyenteDomicilio.controls['provinciaId'].value;
        this.valorDistrito = 121; //this.registerFormContribuyenteDomicilio.controls['distritoId'].value;
        this.valorTipoEdificacion = 1; //tipoEdificacion;
        console.log(this.valorDepartamento, 'depa', this.valorProvincia, 'provincia', this.valorDistrito, 'distrito', this.valorTipoEdificacion, 'valorTipoEdificacion');

        this.serviceVia.listarEdificacion(this.valorDepartamento, this.valorProvincia, this.valorDistrito, this.valorTipoEdificacion)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    this.listaNombreEdificacion = res;
                    console.log(this.listaNombreEdificacion);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de Edificacion');
                }
            });
    }

    listarEdificaciones2(tipoEdificacion: any) {

        this.valorDepartamento = 15;//this.registerFormContribuyenteRelacionado.controls['departamentoId'].value;
        this.valorProvincia = 135;//this.registerFormContribuyenteRelacionado.controls['provinciaId'].value;
        this.valorDistrito = 121;//this.registerFormContribuyenteRelacionado.controls['distritoId'].value;
        this.valorTipoEdificacion = 1; //tipoEdificacion;
        console.log(this.valorDepartamento, 'depa', this.valorProvincia, 'provincia', this.valorDistrito, 'distrito', this.valorTipoEdificacion, 'valorTipoEdificacion');

        this.serviceVia.listarEdificacion(this.valorDepartamento, this.valorProvincia, this.valorDistrito, this.valorTipoEdificacion)
            .subscribe({
                next: (res: any) => {
                    console.log('Motivo', res);
                    this.listaNombreEdificacion = res;
                    console.log(this.listaNombreEdificacion);
                },
                error: (error) => {
                    console.error('Error: ' + error);
                },
                complete: () => {
                    console.log('completo la recuperación de Edificacion');
                }
            });
    }

    updateContribuyente(): void {



        this.verticalStepperForm.get('step1')!.get('usuarioCreacion')!.setValue(this.userEdicion);
        this.verticalStepperForm.get('step1')!.get('terminalCreacion')!.setValue(this.terminal);
        this.verticalStepperForm.get('step2')!.get('usuarioCreacion')!.setValue(this.userEdicion);
        this.verticalStepperForm.get('step2')!.get('terminalCreacion')!.setValue(this.terminal);
        this.verticalStepperForm.get('step3')!.get('usuarioCreacion')!.setValue(this.userEdicion);
        this.verticalStepperForm.get('step3')!.get('terminalCreacion')!.setValue(this.terminal);
        this.verticalStepperForm.get('step4')!.get('usuarioCreacion')!.setValue(this.userEdicion);
        this.verticalStepperForm.get('step4')!.get('terminalCreacion')!.setValue(this.terminal);
        this.verticalStepperForm.get('step5')!.get('usuarioCreacion')!.setValue(this.userEdicion);
        this.verticalStepperForm.get('step5')!.get('terminalCreacion')!.setValue(this.terminal);
          console.log(this.listaDomicilios);
        console.log('LISTA DE DOMICILIO');
        console.log(this.listaContacto);
        console.log('LISTA DE CONTACTO');

        this.classDomicilio.push(this.verticalStepperForm.get('step3')!.value);

    this.classDomicilio.forEach(item=> {

        item.usuarioCreacion = 2025;
        item.terminalCreacion = '192.168.1.1';
    }
    );



        console.log(this.verticalStepperForm.get('step3')!.value);
        console.log('domicilio contribuyente');
        console.log(this.classDomicilio);
        console.log('clase domicilio final');

        this.contribuyenteService.crear(this.verticalStepperForm.get('step1')!.value, this.verticalStepperForm.get('step2')!.value, this.verticalStepperForm.get('step3')!.value, this.verticalStepperForm.get('step5')!.value, this.listaContacto, this.classDomicilio, this.classDocSustento).subscribe({
            next: (contribuyente) => {

                console.log(this.verticalStepperForm.get('step1')!.value, this.verticalStepperForm.get('step2')!.value, this.verticalStepperForm.get('step3')!.value, this.verticalStepperForm.get('step5')!.value, this.listaContacto, this.classDomicilio, this.classDocSustento);
                Swal.fire('Edición:', `Contribuyente actualizado con éxito`, 'success');
                this.router.navigate(['../nsrtm-rate-payer-app']);
            }
        });
    }

    getClaseMedioContactoId(tipoClaseMedioContactoId: number) {
        console.log(tipoClaseMedioContactoId);
        let indice = tipoClaseMedioContactoId - 1;
        console.log(indice);
        console.log(this.maestrosTipoMedioContacto[indice].descripcion);
        console.log('llego oj');

        this.verticalStepperForm.get('step6')!.get('desClaseMedioContacto')!.setValue(this.maestrosTipoMedioContacto[indice].descripcion);

    }


    getTipoMedioContactoId(tipoMedioContactoId: number) {


        console.log(tipoMedioContactoId);
        let indice = tipoMedioContactoId - 1;
        console.log(indice);
        console.log(this.maestrosTipoContacto[indice].descripcion);
        console.log('llego oj');
        this.verticalStepperForm.get('step6')!.get('desTipoMedioContacto')!.setValue(this.maestrosTipoContacto[indice].descripcion);

    }


    eliminarContacto(lessonIndex: number) {
        console.log(lessonIndex);
        this.listaContacto.splice(lessonIndex, 1);
    }
    addContacto() {


        this.verticalStepperForm.get('step6')!.get('usuarioCreacion')!.setValue(this.userEdicion);
        this.verticalStepperForm.get('step6')!.get('terminalCreacion')!.setValue(this.terminal);
        console.log(this.verticalStepperForm.get('step6')!.value);


        this.listaContacto.push(this.verticalStepperForm.get('step6')!.value);

          console.log(this.listaContacto);

    }


}
