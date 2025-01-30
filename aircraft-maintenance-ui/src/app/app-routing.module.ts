import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {authGuard} from "./services/guard/auth.guard";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
    data: {role: ['SENIOR_ENGINEER','ENGINEER']}
  },
  {
    path: 'engineer',
    loadChildren: () => import('./modules/engineer/engineer.module').then(m => m.EngineerModule),
    canActivate: [authGuard],
    data: {role: ['ENGINEER']}
  },
  {
    path: 'senior-engineer',
    loadChildren: () => import('./modules/senior-engineer/senior-engineer.module').then(m => m.SeniorEngineerModule),
    canActivate: [authGuard],
    data: {role: ['SENIOR_ENGINEER']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
