import { Component, OnInit, TemplateRef } from '@angular/core';
import { UposleniciService } from './uposlenici.service';
import { Uposlenik } from 'src/app/models/uposlenici.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Konsultanti } from 'src/app/models/konsultanti.model';


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

  constructor(private uposleniciService: UposleniciService, private modalService: BsModalService, private formBuilder: FormBuilder) { }

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
      phone: ['', Validators.required],
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
    konsultant.telefon = this.f.phone.value;
    konsultant.plata = this.f.projekat.value;
    konsultant.pozicija = this.f.ekspertiza.value;
    this.uposlenici.push(konsultant);
    this.modalRef.hide();
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }






}
