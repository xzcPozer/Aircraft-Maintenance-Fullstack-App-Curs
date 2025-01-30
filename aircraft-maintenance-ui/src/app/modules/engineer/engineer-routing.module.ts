import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "../../services/guard/auth.guard";
import {EngineerPerformedWorksComponent} from "./pages/engineer-performed-works/engineer-performed-works.component";
import {PerformedWorkEditComponent} from "./pages/performed-work-edit/performed-work-edit.component";
import {PerformedWorkAddComponent} from "./pages/performed-work-add/performed-work-add.component";
import {CreateReportByPeriodComponent} from "./pages/create-report-by-period/create-report-by-period.component";
import {EngineerScheduledChecksComponent} from "./pages/engineer-scheduled-checks/engineer-scheduled-checks.component";
import {AirplanesComponent} from "./pages/airplanes/airplanes.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-performed-works',
    pathMatch: "full"
  },
  {
    path: 'my-performed-works',
    component: EngineerPerformedWorksComponent,
    canActivate: [authGuard]
  },
  {
    path: 'my-scheduled-checks',
    component: EngineerScheduledChecksComponent,
    canActivate: [authGuard]
  },
  {
    path: 'airplanes',
    component: AirplanesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'performed-work/edit/:performedWorkId',
    component: PerformedWorkEditComponent,
    canActivate: [authGuard]
  },
  {
    path: 'performed-work/add',
    component: PerformedWorkAddComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create-report',
    component: CreateReportByPeriodComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule {
}
