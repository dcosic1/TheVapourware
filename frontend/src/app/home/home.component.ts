import { Component, OnInit, TemplateRef } from "@angular/core";
import { Dobavljaci } from "../models/dobavljaci.model";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { DobavljaciService } from "../dobavljaci/dobavljaci.service";
import { GlobalService } from "../service/global.service";
import { UposleniciService } from "../uposlenici-odjeli/uposlenici/uposlenici.service";
import { Uposlenik } from "../models/uposlenici.model";
import { ProjektiService } from "../projekti/projekti.service";
import { Projekti } from '../models/projekti.model';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  dobavljaci: Dobavljaci[] = [];
  showMe: boolean = false;
  dobavljac: Dobavljaci;
  modalDobavljac: Dobavljaci;
  dobavljacForma: FormGroup;
  numberOfProjects: number;

  dateRange: any[] = [];
  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  dateValid = false;

  uposlenici: Uposlenik[] = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ["Test"];
  public barChartType = "pie";
  public barChartLegend = true;
  public barChartData = [
    { data: [2.3], label: "Firma1" },
    { data: [4.2], label: "Firma2" },
    { data: [3.5], label: "Firma3" }
  ];

  constructor(
    public globalSvc: GlobalService,
    private uposleniciService: UposleniciService,
    private serviceDobavljaci: DobavljaciService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private projektiService: ProjektiService
  ) {}

  handleStarsClick(dobavljac) {
    this.showMe = true;
    this.dobavljac = dobavljac;
    console.log(dobavljac);
  }

  showMeChangedHandler($event) {
    this.showMe = false;
  }

  dobavljacChangedHandler($event) {
    for (var i = 1; i < this.dobavljaci.length; i++) {
      if (this.dobavljaci[i].nazivFirme == this.dobavljac.nazivFirme) {
        this.dobavljaci[i] = this.dobavljac;
      }
    }
    console.log(this.dobavljaci);
  }

  ngOnInit() {
    this.serviceDobavljaci.getDobavljaci().subscribe(Dobavljaci => {
      this.dobavljaci = Dobavljaci;
      for (var i = 1; i < this.dobavljaci.length; i++) {
        var sum = 0;
        for (var j = 0; j < this.dobavljaci[i].listaOcjena.length; j++) {
          sum += this.dobavljaci[i].listaOcjena[j];
        }

        this.dobavljaci[i].ocjena = sum / this.dobavljaci[i].listaOcjena.length;
      }
    });

    this.uposleniciService.getUposlenici().subscribe(uposlenici => {
      this.uposlenici = uposlenici;
    });

    this.numberOfProjects = this.projektiService.getNumberOfProjects();

    this.dobavljacForma = this.formBuilder.group({
      rasponUgovora: ["", Validators.required]
    });

    // Config for datepicker
    this.dpConfig.containerClass = "theme-dark-blue";
    this.dpConfig.rangeInputFormat = "YYYY/MM/DD";
  }

  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>, dobavljac: Dobavljaci) {
    this.modalRef = this.modalService.show(template);
    this.modalDobavljac = dobavljac;
  }

  onValueChange(event: any) {
    if (typeof this.dateRange !== "undefined") {
      this.dateValid = true;
      this.dateRange[0] = event[0];
      this.dateRange[1] = event[1];
      return;
    }
    this.dateValid = false;
    console.log(
      "CHANGE HAPPENED: " +
        event +
        " *** Date range: " +
        this.dateRange +
        " Date is valid: " +
        this.dateValid
    );
  }

  onAddContract(contract: Dobavljaci) {
    let newId = this.dobavljaci.length + 1;
    let pocetak = this.formatDate(this.dateRange[0]);
    let kraj = this.formatDate(this.dateRange[1]);
    let newContract = new Dobavljaci(
      newId,
      contract.nazivFirme,
      contract.lokacija,
      contract.telefon,
      pocetak,
      kraj,
      contract.ocjena,
      contract.listaOcjena
    );
    this.dobavljaci.push(newContract);
    this.modalRef.hide();
  }

  formatDate(modalDate: Date) {
    var currentDate = modalDate;

    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();

    var dateString = date + "/" + (month + 1) + "/" + year;
    return dateString;
  }

  onCancelContract(contract: Dobavljaci) {
    this.dobavljaci = this.dobavljaci.filter(x => x.id != contract.id);
  }
}
