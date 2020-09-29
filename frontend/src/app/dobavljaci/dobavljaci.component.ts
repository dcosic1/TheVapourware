import { Component, OnInit, TemplateRef } from '@angular/core';
import { DobavljaciService } from './dobavljaci.service';
import { Dobavljaci } from '../models/dobavljaci.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';  

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
  noviDobavljacForm: FormGroup;
  public submitted = false;
  dateRange: any[] = [];
  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  dateValid = false;

  constructor(private toastr: ToastrService, private serviceDobavljaci: DobavljaciService, private modalService: BsModalService, private formBuilder: FormBuilder) { }


  handleStarsClick(dobavljac) {
    this.showMe = true;
    this.dobavljac = dobavljac;
    console.log(dobavljac)
  }

  showMeChangedHandler($event) {
    this.showMe = false;
  }

  dobavljacChangedHandler(dobavljac: Dobavljaci) {
    for (var i = 1; i < this.dobavljaci.length; i++) {
      if (this.dobavljaci[i].nazivFirme == dobavljac.nazivFirme) {
        this.dobavljaci[i] = dobavljac;
      }
    }
    this.modalRef.hide();
    //console.log(this.dobavljaci);
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

    this.noviDobavljacForm = this.formBuilder.group({
      firma: ['', Validators.required],
      telefon: ['', [Validators.required,  Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      lokacija: ['', Validators.required],
      trajanjeUgovora: ['', Validators.required]
    });

    // Config for datepicker
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.rangeInputFormat = 'YYYY/MM/DD';
  }

  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>, dobavljac: Dobavljaci) {
    this.modalRef = this.modalService.show(template);
    if(!!dobavljac)
       this.modalDobavljac = dobavljac;
  }

  onValueChange(event: any) {
    if (!!event) {
      if (!!this.dateRange && this.dateRange.length == 0) {
        this.dateValid = true;
        this.dateRange.push(event[0]);
        this.dateRange.push(event[1]);
        return;
      }

      else if (!!this.dateRange && this.dateRange.length > 1) {
        this.dateRange[0] = event[0];
        this.dateRange[1] = event[1];
      }

      this.dateValid = false;
    }
  }

  onAddContract(contract: Dobavljaci) {
    let dobavljac = this.dobavljaci.find(x => x.id  == contract.id);
    dobavljac.pocetakUgovora = this.formatDate(this.dateRange[0]);;
    dobavljac.krajUgovora = this.formatDate(this.dateRange[1]);
    this.modalRef.hide();
    this.toastr.info("Ugovor uspješno produžen", 'Success');
    this.modalRef.hide();
  }

  formatDate(modalDate: Date) {
    if(!!modalDate){
    var currentDate = modalDate;

    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();

    var dateString = date + "/" + (month + 1) + "/" + year;
    return dateString;
    }
  }

  onCancelContract(contract: Dobavljaci) {
    this.dobavljaci = this.dobavljaci.filter(x => x.id != this.modalDobavljac.id);
    this.toastr.info("Ugovor uspješno poništen", "Success");
    this.modalRef.hide();
    
  }

  hideModal(){
    this.modalRef.hide();
  }

  addDobavljaca(){
    this.submitted = true;
    if(this.noviDobavljacForm.valid){
      this.submitted = false;
    var dobavljacData = this.noviDobavljacForm.value;
    var pocetakUgovora = this.formatDate(this.dateRange[0]);;
    var krajUgovora = this.formatDate(this.dateRange[1]);
    var newDobavljac = new Dobavljaci(this.dobavljaci.length,dobavljacData.firma, dobavljacData.lokacija, dobavljacData.telefon,pocetakUgovora, krajUgovora, 1, []);
    this.dobavljaci.push(newDobavljac);
    this.noviDobavljacForm.reset();
    }
  }

}

