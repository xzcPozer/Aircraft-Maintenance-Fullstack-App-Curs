import {Component, OnInit} from '@angular/core';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {PerformedWorkService} from "../../../../services/services/performed-work.service";
import {Router} from "@angular/router";
import {PerformedWorkRequest} from "../../../../services/models/performed-work-request";
import {AirplaneService} from "../../../../services/services/airplane.service";
import {DataService} from "../../../../services/data-shared/data.service";
import {AircraftCheckService} from "../../../../services/services/aircraft-check.service";

@Component({
  selector: 'app-performed-work-add',
  templateUrl: './performed-work-add.component.html',
  styleUrls: ['./performed-work-add.component.scss']
})
export class PerformedWorkAddComponent implements OnInit {

  errorMsg: Array<string> = [];
  request: PerformedWorkRequest = {
    airplaneSerialNumber: '',
    result: "NORMAL",
    workName: ''
  }

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
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.fetchSerialNumbers();
    this.fetchAircraftChecks();
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

  onCancel() {
    this.sendMessage('');
    this.router.navigate(['/engineer']);
  }

  onSubmit() {
    this.errorMsg = [];

    this.performedWorkService.createPerformedWork({
      body: this.request
    })
      .subscribe({
        next: () => {
          this.sendMessage('запись успешно добавлена')
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

  private sendMessage(message: string) {
    this.dataService.changeMessage(message);
  }

  onSerialNumberInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredSerialNumbers = this.allSerialNumbers.filter(serial =>
      serial.toLowerCase().includes(value)
    );
    this.showNumberSuggestions = true;
  }

  selectSerialNumber(serial: string) {
    this.request.airplaneSerialNumber = serial;
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
    this.request.workName = workName;
    this.showCheckSuggestions = false;
  }
}
