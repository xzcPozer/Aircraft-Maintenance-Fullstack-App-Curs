import {Component, OnInit} from '@angular/core';
import {AirplaneService} from "../../../../services/services/airplane.service";
import {PageResponseAirplaneDto} from "../../../../services/models/page-response-airplane-dto";
import {AirplaneDto} from "../../../../services/models/airplane-dto";

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.scss']
})
export class AirplanesComponent implements OnInit{

  a: AirplaneDto[] = [];
  msg = '';
  level: 'success' |'error' = 'success';
  airplaneDto: PageResponseAirplaneDto = {totalElements: 0};
  serialNumber: string = '';
  page: number = 0;
  size: number = 15;
  pages: any = [];
  isSearch = false;

  constructor(
    private service: AirplaneService
  ) {
  }

  ngOnInit(): void {
    this.findAllAirplanes();
  }

  private findAllAirplanes(){
    this.service.getAllAirplanes({
      page: this.page,
      size: this.size
    }).subscribe({
      next:(checks)=>{
        this.airplaneDto = checks;
        this.pages = this.airplaneDto.totalPages;
      }
    });

    this.isSearch = false;
  }

  private findAirplaneBySerialNum(){
    this.service.getAirplaneBySerialNumber({
      serialNum: this.serialNumber
    }).subscribe({
      next:(dto)=>{
        this.a.push(dto)
        this.airplaneDto.content = this.a;
        this.pages = 1;
        this.a = [];
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
    this.findAllAirplanes();
  }

  searchByDate() {
    this.page = 0;
    this.findAirplaneBySerialNum();
  }

  displayPerformedWorks(_curPage: number) {
    this.page = _curPage;
    if (this.isSearch) {
      this.findAirplaneBySerialNum();
    } else {
      this.findAllAirplanes();
    }
  }
}
