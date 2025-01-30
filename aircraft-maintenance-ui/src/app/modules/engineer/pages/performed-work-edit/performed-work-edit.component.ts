import {Component, OnInit} from '@angular/core';
import {PerformedWorkService} from "../../../../services/services/performed-work.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PerformedWorkRequest} from "../../../../services/models/performed-work-request";
import {DataService} from "../../../../services/data-shared/data.service";
import {AirplaneService} from "../../../../services/services/airplane.service";
import {AircraftCheckService} from "../../../../services/services/aircraft-check.service";

@Component({
  selector: 'app-performed-work-edit',
  templateUrl: './performed-work-edit.component.html',
  styleUrls: ['./performed-work-edit.component.scss']
})
export class PerformedWorkEditComponent implements OnInit {

  errorMsg: Array<string> = [];
  performedWorkRequest: PerformedWorkRequest = {
    airplaneSerialNumber: '',
    result: "NORMAL",
    workName: ''
  };
  performedWorkId: any;

  filteredSerialNumbers: string[] = [];
  allSerialNumbers: string[] = [];

  filteredAircraftChecks: string[] = [];
  allAircraftChecks: string[] = [];

  showNumberSuggestions = false;
  showCheckSuggestions = false;

  constructor(
    private performedWorkService: PerformedWorkService,
    private airplaneService: AirplaneService,
    private aircraftChecksService: AircraftCheckService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.loadPerformedWork();
    this.fetchAircraftChecks();
    this.fetchSerialNumbers();
  }

  onCancel() {
    this.sendMessage('');
    this.router.navigate(['/engineer']);
  }

  updatePerformedWork() {
    this.errorMsg = [];

    this.performedWorkService.updatePerformedWork({
      'performedWorkId': this.performedWorkId,
      body: this.performedWorkRequest
    }).subscribe({
      next:()=>{
        this.sendMessage('выполненная работа была успешно обновлена')
        this.router.navigate(['/engineer'])
      },
      error: (err) => {
        if (err.error.validationErrors)
          this.errorMsg = err.error.validationErrors;
        else
          this.errorMsg.push(err.error.error);
      }
    });
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

  private fetchAircraftChecks() {
    this.aircraftChecksService.getAllChecks()
      .subscribe({
        next: (checks) => {
          this.filteredAircraftChecks = checks;
          this.allAircraftChecks = checks;
        },
        error: (err) => {
          this.errorMsg.push(err.error.error);
        }
      })
  }

  onSerialNumberInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredSerialNumbers = this.allSerialNumbers.filter(serial =>
      serial.toLowerCase().includes(value)
    );
    this.showNumberSuggestions = true;
  }

  selectSerialNumber(serial: string) {
    this.performedWorkRequest.airplaneSerialNumber = serial;
    this.showNumberSuggestions = false;
  }

  onWorkNameInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredAircraftChecks = this.allAircraftChecks.filter(serial =>
      serial.toLowerCase().includes(value)
    );
    this.showCheckSuggestions = true;
  }

  selectWorkName(workName: string) {
    this.performedWorkRequest.workName = workName;
    this.showCheckSuggestions = false;
  }

  private loadPerformedWork(){
    this.performedWorkId = this.activatedRoute.snapshot.params['performedWorkId'];
    if (this.performedWorkId) {
      this.performedWorkService.getWorkByIdAndByEngineerAuthId({
        'performedWorkId': this.performedWorkId
      }).subscribe({
        next: (response) => {
          this.performedWorkRequest = {
            airplaneSerialNumber: response.serialNumber as string,
            completionDate: this.formatDateForInput(response.completionDate as string),
            description: response.description as string,
            result: response.result as 'NORMAL' | 'EXCHANGE' | 'CRASH',
            workName: response.workName as string
          }
        }
      });
    }
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Месяцы начинаются с 0
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  private sendMessage(message: string) {
    this.dataService.changeMessage(message);
  }
}
