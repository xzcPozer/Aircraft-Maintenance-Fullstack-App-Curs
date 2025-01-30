import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeniorEngineerRoutingModule } from './senior-engineer-routing.module';
import { MenuForSeniorComponent } from './components/menu-for-senior/menu-for-senior.component';
import { SeniorEngineerScheduledChecksComponent } from './pages/senior-engineer-scheduled-checks/senior-engineer-scheduled-checks.component';
import { SeniorEngineerPerformedWorkComponent } from './pages/senior-engineer-performed-work/senior-engineer-performed-work.component';
import { CreateReportBySerialNumberAndPeriodComponent } from './pages/create-report-by-serial-number-and-period/create-report-by-serial-number-and-period.component';
import { ScheduledCheckAddComponent } from './pages/scheduled-check-add/scheduled-check-add.component';
import { ScheduledCheckEditComponent } from './pages/scheduled-check-edit/scheduled-check-edit.component';
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {AirplanesComponent} from "./pages/airplanes/airplanes.component";


@NgModule({
  declarations: [
    MenuForSeniorComponent,
    SeniorEngineerScheduledChecksComponent,
    SeniorEngineerPerformedWorkComponent,
    CreateReportBySerialNumberAndPeriodComponent,
    ScheduledCheckAddComponent,
    AirplanesComponent,
    ScheduledCheckEditComponent,
    PaginationComponent
  ],
    imports: [
        CommonModule,
        SeniorEngineerRoutingModule,
        FormsModule
    ]
})
export class SeniorEngineerModule { }
