import {Component, OnInit} from '@angular/core';
import {ScheduledCheckService} from "../../../../services/services/scheduled-check.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../../services/data-shared/data.service";
import {UpdateScheduledCheckRequest} from "../../../../services/models/update-scheduled-check-request";

@Component({
  selector: 'app-scheduled-check-edit',
  templateUrl: './scheduled-check-edit.component.html',
  styleUrls: ['./scheduled-check-edit.component.scss']
})
export class ScheduledCheckEditComponent implements OnInit {
  errorMsg: Array<string> = [];
  request: UpdateScheduledCheckRequest = {
    date: '',
    status: 'PLANNED'
  };
  scheduledCheckId: any;

  constructor(
    private scheduledCheckService: ScheduledCheckService,
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  onCancel() {
    this.sendMessage('');
    this.router.navigate(['/senior-engineer']);
  }

  onSubmit() {
    this.errorMsg = [];

    this.scheduledCheckService.updateScheduledCheck({
      'scheduledCheckId': this.scheduledCheckId,
      body: this.request
    })
      .subscribe({
        next: () => {
          this.sendMessage('запись успешно обновлена')
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

  private loadPerformedWork() {
    this.scheduledCheckId = this.activatedRoute.snapshot.params['scheduledCheckId'];
    if (this.scheduledCheckId) {
      this.scheduledCheckService.getScheduledCheckById({
        'scheduledCheckId': this.scheduledCheckId
      }).subscribe({
        next: (response) => {
          this.request = {
            status: response.status as 'PLANNED' | 'PROCESSING' | 'COMPLETED' | 'CANCELED',
            date: this.formatDateForInput(response.date as string),
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

  ngOnInit(): void {
    this.loadPerformedWork();
  }
}
