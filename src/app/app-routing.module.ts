import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const AuthModule = import('./modules/auth/auth.module').then((m) => m.AuthModule)
const DashboardModule = import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)


// TODO AGREGAR EL GUARD
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule
  },
  {
    path: "**",
    redirectTo: "auth"
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
