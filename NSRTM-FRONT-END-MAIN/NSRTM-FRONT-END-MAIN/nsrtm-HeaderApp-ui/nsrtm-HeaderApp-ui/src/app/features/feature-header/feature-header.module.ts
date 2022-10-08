import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureHeaderRoutingModule } from './feature-header-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { HeaderComponent } from '../../core/components/header/header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    FeatureHeaderRoutingModule,
    MaterialModule
  ]
})
export class FeatureHeaderModule { }
