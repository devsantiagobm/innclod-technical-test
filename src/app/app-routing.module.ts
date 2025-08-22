import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sessionGuard } from './core/guards/session/session.guard';

const AuthModule = import('./modules/auth/auth.module').then((m) => m.AuthModule)
const DashboardModule = import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule,
    canActivate: [sessionGuard],
    data: { requiresAuth: false }
  },
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule,
    canActivate: [sessionGuard],
    data: { requiresAuth: true }
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
