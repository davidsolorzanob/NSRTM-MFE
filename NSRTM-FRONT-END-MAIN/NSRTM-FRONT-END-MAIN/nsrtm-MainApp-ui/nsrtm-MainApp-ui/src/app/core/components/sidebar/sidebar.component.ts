import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from 'src/app/core/models/IMenu';
import { HttpclientService } from 'src/app/core/services/HttpClientServices';
import * as data from '../../../../assets/menu.json';

@Component({
  selector: 'nsrtm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  menuList: {
    defaultOptions: Array<any>;
  } = { defaultOptions: []};
  constructor(private httpService: HttpclientService) { }

  ngOnInit() {
    this.menuList.defaultOptions = [
      {
        "text": "Registro y Determinación de Deuda",
        "icon": "inventory_2",
        "children": [{
                "text": "Contibuyente/Predio",
                "icon": "category",
                "routerLink": "/nsrtm-rate-payer-app"
            }
        ]
    }, {
        "text": "Determinación de Deuda",
        "icon": "inventory_2",
        "children": [{
                "text": "Cálculo de la Base Imponible",
                "icon": "category",
                "routerLink": "/product/category"
            },
            {
                "text": "Cálculo del Impuesto",
                "icon": "layers",
                "routerLink": "/product/sub-category"
            },
            {
                "text": "Distribución de Costos de Arbitrios",
                "icon": "all_inbox",
                "routerLink": "/product/manage"
            },
            {
                "text": "Emisión Masiva",
                "icon": "all_inbox",
                "routerLink": "/product/manage"
            }
        ]
    }, {
        "text": "Notificaciones",
        "icon": "inventory_2",
        "children": [{
                "text": "Registro de Documentos a Notificar",
                "icon": "category",
                "routerLink": "/nsrtm-notificacion-app"
            },
            {
                "text": "Control de Envió de Docuemntos",
                "icon": "layers",
                "routerLink": "/product/sub-category"
            },
            {
                "text": "Control de Recepción de Documentos",
                "icon": "all_inbox",
                "routerLink": "/product/manage"
            },
            {
                "text": "Registro de Resultados de la Notificación",
                "icon": "all_inbox",
                "routerLink": "/product/manage"
            }
        ]
    },
    {
        "text": "Report",
        "icon": "analytics",
        "routerLink": "/reports"
    }
    ];
  console.log(this.menuList);
    //this.menuList = this.httpService.getList<IMenu>('./assets/menu.json')
  }

}
