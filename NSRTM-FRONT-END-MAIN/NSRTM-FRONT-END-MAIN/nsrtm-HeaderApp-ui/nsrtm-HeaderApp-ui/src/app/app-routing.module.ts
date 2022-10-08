import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from "./core/components/header/header.component";
import { EmptyRouteComponent } from "./empty-route/empty-route.component";

const routes: Routes = [
{ 
path: "**", component: EmptyRouteComponent
},
{
  path: '',
  component: HeaderComponent, 
  loadChildren: () =>
    import('./features/feature-header/feature-header.module').then((m) => m.FeatureHeaderModule),
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
})
export class AppRoutingModule {}