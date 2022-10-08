import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRatepayerRoutingModule } from './feature-ratepayer-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from '../core/components/list/list.component';
import { PageRatepayerComponent } from './pages/pages-ratepayer/page-ratepayer.component';
import { ContribuyenteComponent } from '../core/components/list/contribuyente.component';
import { ContribuyenteEditarComponent } from '../core/components/list/contribuyente-editar.component';
import { ContribuyenteVerComponent } from '../core/components/list/contribuyente-ver.component';
@NgModule({
  declarations: [
    ListComponent,
    PageRatepayerComponent,
    ContribuyenteComponent,
    ContribuyenteEditarComponent,
    ContribuyenteVerComponent
  ],
  exports: [
    PageRatepayerComponent,
  ],
  imports: [
    CommonModule,
    FeatureRatepayerRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeatureRatepayerModule { }
