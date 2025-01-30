import {Component, OnInit} from '@angular/core';
import {AirplaneService} from "../../../../services/services/airplane.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../services/data-shared/data.service";
import {AddScheduledCheckRequest} from "../../../../services/models/add-scheduled-check-request";
import {ScheduledCheckService} from "../../../../services/services/scheduled-check.service";

@Component({
  selector: 'app-scheduled-check-add',
  templateUrl: './scheduled-check-add.component.html',
  styleUrls: ['./scheduled-check-add.component.scss']
})
export class ScheduledCheckAddComponent implements OnInit{
  errorMsg: Array<string> = [];
  request: AddScheduledCheckRequest = {
    airplaneSerialNumber: '',
    date: '',
    status: "PLANNED",
    type: "DAILY"
  }

  filteredSerialNumbers: string[] = [];
  allSerialNumbers: string[] = [];

  showNumberSuggestions = false;

  constructor(
    private scheduledCheckService: ScheduledCheckService,
    private airplaneService: AirplaneService,
    private router: Router,
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

  onCancel() {
    this.sendMessage('');
    this.router.navigate(['/senior-engineer']);
  }

  onSubmit() {
    this.errorMsg = [];

    this.scheduledCheckService.addScheduledCheck({
      body: this.request
    })
      .subscribe({
        next: () => {
          this.sendMessage('запись успешно добавлена')
          this.router.navigate(['/senior-engineer'])
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
}
