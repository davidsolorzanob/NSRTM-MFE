import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageMainComponent } from '@features/feature-main/pages/page-main/page-main.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

const routes: Routes = [
{ path: '**', component: EmptyRouteComponent },
{
  path: '',
  component: PageMainComponent, 
  loadChildren: () =>
    import('./features/feature-main/feature-main.module').then((m) => m.FeatureMainModule),
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule {}