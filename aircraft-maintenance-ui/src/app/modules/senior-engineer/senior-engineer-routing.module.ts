import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "../../services/guard/auth.guard";
import {
  SeniorEngineerScheduledChecksComponent
} from "./pages/senior-engineer-scheduled-checks/senior-engineer-scheduled-checks.component";
import {
  SeniorEngineerPerformedWorkComponent
} from "./pages/senior-engineer-performed-work/senior-engineer-performed-work.component";
import {
  CreateReportBySerialNumberAndPeriodComponent
} from "./pages/create-report-by-serial-number-and-period/create-report-by-serial-number-and-period.component";
import {ScheduledCheckEditComponent} from "./pages/scheduled-check-edit/scheduled-check-edit.component";
import {ScheduledCheckAddComponent} from "./pages/scheduled-check-add/scheduled-check-add.component";
import {AirplanesComponent} from "./pages/airplanes/airplanes.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-scheduled-checks',
    pathMatch: "full"
  },
  {
    path: 'my-scheduled-checks',
    component: SeniorEngineerScheduledChecksComponent,
    canActivate: [authGuard]
  },
  {
    path: 'all-performed-works',
    component: SeniorEngineerPerformedWorkComponent,
    canActivate: [authGuard]
  },
  {
    path: 'airplanes',
    component: AirplanesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'scheduled-check/edit/:scheduledCheckId',
    component: ScheduledCheckEditComponent,
    canActivate: [authGuard]
  },
  {
    path: 'scheduled-check/add',
    component: ScheduledCheckAddComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create-report',
    component: CreateReportBySerialNumberAndPeriodComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeniorEngineerRoutingModule { }
