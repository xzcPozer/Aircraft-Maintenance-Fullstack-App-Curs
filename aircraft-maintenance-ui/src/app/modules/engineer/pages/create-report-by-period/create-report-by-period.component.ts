import {Component} from '@angular/core';
import {PerformedWorkService} from "../../../../services/services/performed-work.service";
import {Router} from "@angular/router";
import {CreateReportByPeriodRequest} from "../../../../services/models/create-report-by-period-request";
import {DataService} from "../../../../services/data-shared/data.service";

@Component({
  selector: 'app-create-report-by-period',
  templateUrl: './create-report-by-period.component.html',
  styleUrls: ['./create-report-by-period.component.scss']
})
export class CreateReportByPeriodComponent {

  errorMsg: Array<string> = [];
  request: CreateReportByPeriodRequest = {
    date1: '',
    reportFormat: ''
  };


  constructor(
    private performedWorkService: PerformedWorkService,
    private router: Router,
    private dataService: DataService
  ) {
  }

  onSubmit() {
    this.errorMsg = [];

    this.performedWorkService.createReportByPeriod({
      body: this.request
    }).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        let fileName = 'engineer-performed-works';
        switch (this.request.reportFormat) {
          case 'xml':
            fileName += '.xml';
            break;
          default:
            fileName += '.pdf';
            break;
        }
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.errorMsg.push('выберите тип файла');
        this.errorMsg.push('выберите дату');
        this.errorMsg.push('Неправильно указанная дата');
      }
    });
  }

  private sendMessage(message: string) {
    this.dataService.changeMessage(message);
  }

  onCancel() {
    this.sendMessage('');
    this.router.navigate(['/engineer']);
  }
}
