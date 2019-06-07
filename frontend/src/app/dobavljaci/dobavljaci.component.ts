import { Component, OnInit, TemplateRef } from '@angular/core';
import { DobavljaciService } from './dobavljaci.service';
import { Dobavljaci } from '../models/dobavljaci.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-dobavljaci',
  templateUrl: './dobavljaci.component.html',
  styleUrls: ['./dobavljaci.component.css']
})


export class DobavljaciComponent implements OnInit {

  dobavljaci: Dobavljaci[] = []
  showMe: boolean = false;
  dobavljac: Dobavljaci;
  modalDobavljac: Dobavljaci;
  dobavljacForma: FormGroup;

  dateRange: any[] = [];
  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  dateValid = false;

  constructor(private serviceDobavljaci: DobavljaciService, private modalService: BsModalService, private formBuilder: FormBuilder) { }


  handleStarsClick(dobavljac) {
    this.showMe = true;
    this.dobavljac = dobavljac;
    console.log(dobavljac)
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
    this.serviceDobavljaci.getDobavljaci().subscribe(
      Dobavljaci => {
        this.dobavljaci = Dobavljaci;
        for (var i = 1; i < this.dobavljaci.length; i++) {
          var sum = 0;
          for (var j = 0; j < this.dobavljaci[i].listaOcjena.length; j++) {
            sum += this.dobavljaci[i].listaOcjena[j];
          }

          this.dobavljaci[i].ocjena = sum / this.dobavljaci[i].listaOcjena.length;
        }
      }
    );

    this.dobavljacForma = this.formBuilder.group({
      rasponUgovora: ['', Validators.required],
    });

    // Config for datepicker
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.rangeInputFormat = 'YYYY/MM/DD';
  }

  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>, dobavljac: Dobavljaci) {
    this.modalRef = this.modalService.show(template);
    this.modalDobavljac = dobavljac;
  }

  onValueChange(event: any) {
    if (typeof this.dateRange !== 'undefined') {
      this.dateValid = true;
      this.dateRange[0] = event[0];
      this.dateRange[1] = event[1];
      return;
    }
    this.dateValid = false;
    console.log("CHANGE HAPPENED: " + event + " *** Date range: " + this.dateRange + " Date is valid: " + this.dateValid);
  }


  onAddContract(contract: Dobavljaci) {
    let newId = this.dobavljaci.length + 1;
    let pocetak = this.formatDate(this.dateRange[0]);
    let kraj = this.formatDate(this.dateRange[1]);
    let newContract = new Dobavljaci(newId, contract.nazivFirme, contract.lokacija, contract.telefon, pocetak, kraj, contract.ocjena, contract.listaOcjena);
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

