import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EngineerRoutingModule} from './engineer-routing.module';
import {MenuComponent} from './components/menu/menu.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {EngineerPerformedWorksComponent} from './pages/engineer-performed-works/engineer-performed-works.component';
import {FormsModule} from "@angular/forms";
import {PerformedWorkAddComponent} from './pages/performed-work-add/performed-work-add.component';
import {PerformedWorkEditComponent} from './pages/performed-work-edit/performed-work-edit.component';
import {CreateReportByPeriodComponent} from './pages/create-report-by-period/create-report-by-period.component';
import {EngineerScheduledChecksComponent} from './pages/engineer-scheduled-checks/engineer-scheduled-checks.component';
import { AirplanesComponent } from './pages/airplanes/airplanes.component';


@NgModule({
  declarations: [
    MenuComponent,
    PaginationComponent,
    EngineerPerformedWorksComponent,
    PerformedWorkAddComponent,
    PerformedWorkEditComponent,
    CreateReportByPeriodComponent,
    EngineerScheduledChecksComponent,
    AirplanesComponent
  ],
  imports: [
    CommonModule,
    EngineerRoutingModule,
    FormsModule
  ]
})
export class EngineerModule { }
