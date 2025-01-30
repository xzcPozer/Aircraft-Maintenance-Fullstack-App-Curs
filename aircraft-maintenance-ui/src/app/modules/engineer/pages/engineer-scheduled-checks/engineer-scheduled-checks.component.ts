import {Component, OnInit} from '@angular/core';
import {PageResponseScheduledCheckDto} from "../../../../services/models/page-response-scheduled-check-dto";
import {ScheduledCheckService} from "../../../../services/services/scheduled-check.service";

@Component({
  selector: 'app-engineer-scheduled-checks',
  templateUrl: './engineer-scheduled-checks.component.html',
  styleUrls: ['./engineer-scheduled-checks.component.scss']
})
export class EngineerScheduledChecksComponent implements OnInit{

  msg = '';
  level: 'success' |'error' = 'success';
  scheduledCheckDto: PageResponseScheduledCheckDto = {totalElements: 0};
  searchDate: string = '';
  page: number = 0;
  size: number = 3;
  pages: any = [];
  isSearch = false;

  constructor(
    private service: ScheduledCheckService
  ) {
  }

  ngOnInit(): void {
    this.findAllScheduledChecks();
  }

  private findAllScheduledChecks(){
    this.service.getAllScheduledWorks({
      page: this.page,
      size: this.size
    }).subscribe({
      next:(checks)=>{
        this.scheduledCheckDto = checks;
        this.pages = this.scheduledCheckDto.totalPages;
      }
    });

    this.isSearch = false;
  }

  private findAllScheduledChecksByDate(){
    this.service.getAllScheduledWorkByDate({
      page: this.page,
      size: this.size,
      date: this.searchDate
    }).subscribe({
      next:(checks)=>{
        this.scheduledCheckDto = checks;
        this.pages = this.scheduledCheckDto.totalPages;
      },
      error: (err) => {
        this.level = 'error';
        this.msg = err.error.error;
      }
    });

    this.isSearch = true;
  }

  resetSearch() {
    this.page = 0;
    this.findAllScheduledChecks();
  }

  searchByDate() {
    this.page = 0;
    this.findAllScheduledChecksByDate();
  }

  displayPerformedWorks(_curPage: number) {
    this.page = _curPage;
    if (this.isSearch) {
      this.findAllScheduledChecksByDate();
    } else {
      this.findAllScheduledChecks();
    }
  }
}
