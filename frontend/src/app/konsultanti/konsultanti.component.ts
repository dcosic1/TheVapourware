import { Component, OnInit, TemplateRef } from '@angular/core';
import { KonsultantiService } from './konsultanti.service';
import { Konsultanti } from '../models/konsultanti.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-konsultanti',
  templateUrl: './konsultanti.component.html',
  styleUrls: ['./konsultanti.component.css']
})
export class KonsultantiComponent implements OnInit {

  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  registerForm: FormGroup;
  deleteForm: FormGroup;
  consultantId: number;
  submitted = false;

  constructor(private serviceKonsultanti: KonsultantiService, private modalService: BsModalService, private formBuilder: FormBuilder) { }
  konsultanti: Konsultanti[] = []

  ngOnInit() {
    this.serviceKonsultanti.getKonsultanti().subscribe(
      konsultanti => {
        this.konsultanti = konsultanti;
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
  get f1() { return this.deleteForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let id = this.konsultanti.length + 1;
    let konsultant = new Konsultanti(id, this.f.firstName.value, this.f.lastName.value, this.f.phone.value, this.f.email.value, this.f.ekspertiza.value);
    this.konsultanti.push(konsultant);
    this.modalRef.hide();
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openDelModal(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template);

  }

  onDelete() {
    this.konsultanti = this.konsultanti.filter(element => element.id != this.consultantId);
    this.modalRef2.hide();
    return;

  }

}
