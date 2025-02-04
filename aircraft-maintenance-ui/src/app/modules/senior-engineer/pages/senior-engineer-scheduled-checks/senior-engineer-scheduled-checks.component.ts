import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../../../services/data-shared/data.service";
import {PageResponseScheduledCheckDto} from "../../../../services/models/page-response-scheduled-check-dto";
import {ScheduledCheckService} from "../../../../services/services/scheduled-check.service";
import {ScheduledCheckDto} from "../../../../services/models/scheduled-check-dto";

@Component({
  selector: 'app-senior-engineer-scheduled-checks',
  templateUrl: './senior-engineer-scheduled-checks.component.html',
  styleUrls: ['./senior-engineer-scheduled-checks.component.scss']
})
export class SeniorEngineerScheduledChecksComponent implements OnInit {

  msg = '';
  level: 'success' | 'error' = 'success';
  responseScheduledCheckDto: PageResponseScheduledCheckDto = {totalElements: 0};
  page: number = 0;
  size: number = 10;
  pages: any = [];

  constructor(
    private scheduledCheckService: ScheduledCheckService,
    private router: Router,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.msg = message);
    this.findAllAuthScheduledChecks();
  }

  private findAllAuthScheduledChecks() {
    this.scheduledCheckService.getAllScheduledCheckByEngineerId({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (performedWorks) => {
          this.responseScheduledCheckDto = performedWorks;
          this.pages = this.responseScheduledCheckDto.totalPages;
        }
      });
  }

  editScheduledCheck(scheduledCheckDto: ScheduledCheckDto) {
    this.router.navigate(['senior-engineer', 'scheduled-check', 'edit', scheduledCheckDto.id]);
  }

  displayScheduledChecks(_curPage: number) {
    this.page = _curPage;
    this.findAllAuthScheduledChecks();
  }

  addScheduledCheck() {
    this.router.navigate(['senior-engineer', 'scheduled-check', 'add']);
  }
}
