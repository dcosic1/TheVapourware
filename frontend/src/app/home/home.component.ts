import { Component, OnInit, TemplateRef } from '@angular/core';
import { Dobavljaci } from '../models/dobavljaci.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DobavljaciService } from '../dobavljaci/dobavljaci.service';
import { GlobalService } from '../service/global.service';
import { UposleniciService } from '../uposlenici-odjeli/uposlenici/uposlenici.service';
import { Uposlenik } from '../models/uposlenici.model';
import { Package } from '../models/package';
import { Projekti } from '../models/projekti.model';
import { Konsultanti } from '../models/konsultanti.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  dobavljaci: Dobavljaci[] = [];
  projekti: Projekti[] = [];
  konsultanti: Konsultanti[]=[];
 paketi: Package[] = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ["Test"];
  public barChartType = 'pie';
  public barChartLegend = true;
  public barChartData = [
    {data: [2.3], label: 'Firma1'},
    {data: [4.2], label: 'Firma2'},
    {data: [3.5], label: 'Firma3'}
  ];

  constructor(public globalSvc: GlobalService, private uposleniciService: UposleniciService,
    private serviceDobavljaci: DobavljaciService, private modalService: BsModalService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.konsultanti = JSON.parse(window.localStorage.getItem("konsultanti"));
    this.projekti = JSON.parse(window.localStorage.getItem("projekti"));
    this.dobavljaci = JSON.parse(window.localStorage.getItem("dobavljaci"));
    this.paketi = JSON.parse(window.localStorage.getItem("hardware"));
  }
}

