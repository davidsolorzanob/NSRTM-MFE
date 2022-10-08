import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './core/components/list/list.component';
import { ContribuyenteComponent } from './core/components/list/contribuyente.component';
import { ContribuyenteEditarComponent } from './core/components/list/contribuyente-editar.component';
import { ContribuyenteVerComponent } from './core/components/list/contribuyente-ver.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';


const routes: Routes = [
{ path: 'nsrtm-rate-payer-app', component: ListComponent },
{ path: 'nsrtm-rate-payer-app/crear', component: ContribuyenteComponent },
{ path: 'nsrtm-rate-payer-app/edit/:id/:dj', component: ContribuyenteEditarComponent },
{ path: 'nsrtm-rate-payer-app/ver/:id/:dj', component: ContribuyenteVerComponent },
{ path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule {}
