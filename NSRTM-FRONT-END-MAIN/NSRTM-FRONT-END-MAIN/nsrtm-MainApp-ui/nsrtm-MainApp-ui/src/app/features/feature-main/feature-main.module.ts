import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureMainRoutingModule } from './feature-main-routing.module';
import { PageMainComponent } from './pages/page-main/page-main.component';

import { MaterialModule } from 'src/app/material.module';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../core/components/header/header.component';

@NgModule({
  declarations: [
    PageMainComponent,
    SidebarComponent,
    HeaderComponent
  ],
  exports: [PageMainComponent],
  imports: [
    CommonModule,
    FeatureMainRoutingModule,
    MaterialModule,

  ]
})
export class FeatureMainModule { }
