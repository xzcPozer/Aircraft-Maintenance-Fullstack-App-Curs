import {Component, OnInit} from '@angular/core';
import {PageResponseAuthPerformedWorkDto} from "../../../../services/models/page-response-auth-performed-work-dto";
import {PerformedWorkService} from "../../../../services/services/performed-work.service";
import {AuthPerformedWorkDto} from "../../../../services/models/auth-performed-work-dto";
import {Router} from "@angular/router";
import {DataService} from "../../../../services/data-shared/data.service";

@Component({
  selector: 'app-engineer-performed-works',
  templateUrl: './engineer-performed-works.component.html',
  styleUrls: ['./engineer-performed-works.component.scss']
})
export class EngineerPerformedWorksComponent implements OnInit {
  msg = '';
  level: 'success' |'error' = 'success';
  performedWorkResponse: PageResponseAuthPerformedWorkDto = {totalElements: 0};
  searchDate: string = '';
  page: number = 0;
  size: number = 3;
  pages: any = [];
  isSearch = false;

  constructor(
    private performedWorkService: PerformedWorkService,
    private router: Router,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.msg = message);
    this.findAllAuthEngineerPerformedWorks();
  }

  resetSearch() {
    this.page = 0;
    this.findAllAuthEngineerPerformedWorks();
  }

  search() {
    this.page = 0;
    this.findAllAuthEngineerPerformedWorksByDate();
  }

  private findAllAuthEngineerPerformedWorks() {
    this.performedWorkService.getAllWorksByEngineerAuthId({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (performedWorks) => {
          this.performedWorkResponse = performedWorks;
          this.pages = this.performedWorkResponse.totalPages;
        }
      });
    this.isSearch = false;
  }

  private findAllAuthEngineerPerformedWorksByDate() {
    this.performedWorkService.getAllPerformedWorksByEngineerAuthIdAndDate({
      page: this.page,
      size: this.size,
      date: this.searchDate
    })
      .subscribe({
        next: (performedWorks) => {
          this.performedWorkResponse = performedWorks;
          this.pages = this.performedWorkResponse.totalPages;
        },
        error: (err) => {
          this.level = 'error';
          this.msg = err.error.error;
        }
      });

    this.isSearch = true;
  }

  editPerformedWork(performedWorkDto: AuthPerformedWorkDto) {
    this.router.navigate(['engineer', 'performed-work', 'edit', performedWorkDto.id]);
  }

  displayPerformedWorks(_curPage: number) {
    this.page = _curPage;
    if (this.isSearch) {
      this.findAllAuthEngineerPerformedWorksByDate();
    } else {
      this.findAllAuthEngineerPerformedWorks();
    }
  }

  createReport() {
    this.router.navigate(['engineer', 'create-report']);
  }

  addPerformedWork() {
    this.router.navigate(['engineer', 'performed-work', 'add']);
  }
}
