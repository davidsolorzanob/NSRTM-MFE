import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FeatureMainModule } from '@features/feature-main/feature-main.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpclientService } from './core/services/HttpClientServices';
import { HttpClientModule} from '@angular/common/http';
import { EmptyRouteComponent } from '@empty-route/empty-route.component';
@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FeatureMainModule,
    MaterialModule
  ],
  providers: [HttpclientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
