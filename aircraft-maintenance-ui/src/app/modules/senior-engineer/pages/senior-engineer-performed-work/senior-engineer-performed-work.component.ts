import {Component} from '@angular/core';
import {PageResponsePerformedWorkDto} from "../../../../services/models/page-response-performed-work-dto";
import {PerformedWorkService} from "../../../../services/services/performed-work.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-senior-engineer-performed-work',
  templateUrl: './senior-engineer-performed-work.component.html',
  styleUrls: ['./senior-engineer-performed-work.component.scss']
})
export class SeniorEngineerPerformedWorkComponent {

  msg = '';
  level: 'success' | 'error' = 'success';
  performedWorkDto: PageResponsePerformedWorkDto = {totalElements: 0};
  page: number = 0;
  size: number = 10;
  pages: any = [];

  constructor(
    private service: PerformedWorkService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllPerformedWork();
  }

  private findAllPerformedWork() {
    this.service.getAllWorks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (checks) => {
        this.performedWorkDto = checks;
        this.pages = this.performedWorkDto.totalPages;
      }
    });
  }

  createReport(){
    this.router.navigate(['senior-engineer', 'create-report']);
  }

  displayPerformedWorks(_curPage: number) {
    this.page = _curPage;
    this.findAllPerformedWork();
  }
}
