import { Component, OnInit, TemplateRef } from '@angular/core';
import { UposleniciService } from './uposlenici.service';
import { Uposlenik } from 'src/app/models/uposlenici.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Konsultanti } from 'src/app/models/konsultanti.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-uposlenici',
  templateUrl: './uposlenici.component.html',
  styleUrls: ['./uposlenici.component.css']
})
export class UposleniciComponent implements OnInit {

  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  registerForm: FormGroup;
  deleteForm: FormGroup;
  consultantId: number;
  submitted = false;

  activeUposlenik : Uposlenik;
  constructor(private toastr: ToastrService,private uposleniciService: UposleniciService, private modalService: BsModalService, private formBuilder: FormBuilder) { }

  uposlenici: Uposlenik[] = []

  ngOnInit() {
    this.uposleniciService.getUposlenici().subscribe(
      uposlenici => {
        this.uposlenici = uposlenici;
      }
    );

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefon: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      projekat: ['', Validators.required],
      ekspertiza: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openDelModal(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template);

  }

  onDelete() {
    this.uposlenici = this.uposlenici.filter(element => element.id != this.consultantId);
    this.modalRef2.hide();
    return;

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let id = this.uposlenici.length + 1;
    let konsultant = new Uposlenik();
    konsultant.id = id;
    konsultant.ime = this.f.firstName.value;
    konsultant.prezime = this.f.lastName.value;
    konsultant.email = this.f.email.value;
    konsultant.telefon = this.f.telefon.value;
    konsultant.plata = this.f.projekat.value;
    konsultant.pozicija = this.f.ekspertiza.value;
    this.uposlenici.push(konsultant);
    this.modalRef.hide();
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

public obrisiUposlenika(uposlenik: Uposlenik){
  var index = this.uposlenici.findIndex(x => x.id == this.activeUposlenik.id);
  this.uposlenici.splice(index, 1);
}

onContinue(uposlenik: Uposlenik){
this.obrisiUposlenika(uposlenik);
this.modalRef.hide();
this.toastr.info("Uposlenik uspješno obrisan", "Success");

}

setActiveUposlenik(uposlenik :  Uposlenik){
this.activeUposlenik = uposlenik;
}

hideModal(){
this.modalRef.hide();
}





}
