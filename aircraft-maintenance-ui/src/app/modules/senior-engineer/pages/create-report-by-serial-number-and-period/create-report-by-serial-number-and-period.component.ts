import {Component, OnInit} from '@angular/core';
import {CreateReportByPeriodRequest} from "../../../../services/models/create-report-by-period-request";
import {PerformedWorkService} from "../../../../services/services/performed-work.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../services/data-shared/data.service";
import {
  CreateReportByPeriodAndSerialNumberRequest
} from "../../../../services/models/create-report-by-period-and-serial-number-request";
import {AirplaneService} from "../../../../services/services/airplane.service";

@Component({
  selector: 'app-create-report-by-serial-number-and-period',
  templateUrl: './create-report-by-serial-number-and-period.component.html',
  styleUrls: ['./create-report-by-serial-number-and-period.component.scss']
})
export class CreateReportBySerialNumberAndPeriodComponent implements OnInit{

  errorMsg: Array<string> = [];
  request: CreateReportByPeriodAndSerialNumberRequest = {
    date1: '',
    reportFormat: '',
    serialNumber: ''
  };

  filteredSerialNumbers: string[] = [];
  allSerialNumbers: string[] = [];

  showNumberSuggestions = false;

  constructor(
    private performedWorkService: PerformedWorkService,
    private router: Router,
    private airplaneService: AirplaneService,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.fetchSerialNumbers();
  }

  private fetchSerialNumbers() {
    this.airplaneService.getAllAirplanesSerialNumber()
      .subscribe({
        next: (serialNumbers) => {
          this.allSerialNumbers = serialNumbers;
          this.filteredSerialNumbers = serialNumbers;
        },
        error: (err) => {
          this.errorMsg.push(err.error.error);
        }
      })
  }

  onSubmit() {
    this.errorMsg = [];

    this.performedWorkService.createReportByPeriodAndSerialNumber({
      body: this.request
    }).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        let fileName = 'all-performed-works';
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
        this.errorMsg.push('неправильно указанная дата');
      }
    });
  }

  private sendMessage(message: string) {
    this.dataService.changeMessage(message);
  }

  onCancel() {
    this.sendMessage('');
    this.router.navigate(['/senior-engineer']);
  }

  onSerialNumberInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredSerialNumbers = this.allSerialNumbers.filter(serial =>
      serial.toLowerCase().includes(value)
    );
    this.showNumberSuggestions = true;
  }

  selectSerialNumber(serial: string) {
    this.request.serialNumber = serial;
    this.showNumberSuggestions = false;
  }

}
