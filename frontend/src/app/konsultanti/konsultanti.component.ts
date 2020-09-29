import { Component, OnInit, TemplateRef } from "@angular/core";
import { KonsultantiService } from "./konsultanti.service";
import { Konsultanti } from "../models/konsultanti.model";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-konsultanti",
  templateUrl: "./konsultanti.component.html",
  styleUrls: ["./konsultanti.component.css"]
})
export class KonsultantiComponent implements OnInit {
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  registerForm: FormGroup;
  deleteForm: FormGroup;
  consultantId: number;
  submitted = false;


  constructor(
    
    private serviceKonsultanti: KonsultantiService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  konsultanti: Konsultanti[] = [];
  konsultant: Konsultanti;

  ngOnInit() {
    this.konsultanti = JSON.parse(window.localStorage.getItem("konsultanti"));
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telefon: ["",[Validators.required,  Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      ekspertiza: ["", Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  get f1() {
    return this.deleteForm.controls;
  }

  showToaster() {
    this.toastr.success("Konsultant je uspjesno dodan!");
  }
  showToasterdDelete() {
    this.toastr.success("Konsultant je uspjesno izbrisan!");
  }
  showToasterEdit() {
    this.toastr.success("Konsultant je uspjesno uredjen!");
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let id = this.konsultanti.length + 1;
    let konsultant = new Konsultanti(id,
      this.f.firstName.value,
      this.f.lastName.value,
      this.f.telefon.value,
      this.f.email.value,
      this.f.ekspertiza.value,
      null
    );

    this.konsultanti.push(konsultant);
    this.modalRef.hide();
    this.showToaster();
    window.localStorage.setItem("konsultanti", JSON.stringify(this.konsultanti));


    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  openModal(template: TemplateRef<any>, konsultant: Konsultanti) {
    this.modalRef = this.modalService.show(template);
    if(!!konsultant){
    this.consultantId = konsultant.id;
    this.registerForm.controls.firstName.setValue(konsultant.ime);
    this.registerForm.controls.lastName.setValue(konsultant.prezime);
    this.registerForm.controls.email.setValue(konsultant.email);
    this.registerForm.controls.telefon.setValue(konsultant.telefon);
    this.registerForm.controls.ekspertiza.setValue(konsultant.ekspertiza);

    this.konsultant=konsultant;
  }
  }

  openDelModal(template: TemplateRef<any>) {

    this.modalRef2 = this.modalService.show(template);
  }

  onDelete() {
    this.konsultanti.splice(this.konsultanti.findIndex(x => x.id ==  this.consultantId), 1);
    this.modalRef.hide();
    window.localStorage.setItem("konsultanti", JSON.stringify(this.konsultanti));
    this.showToasterdDelete()
    return;
  }

  onEdit() {
    if(this.registerForm.valid){
      this.submitted = true;
    let edited = this.konsultanti.find(kons => kons.id === this.consultantId);
    var value = this.registerForm.value;
    edited.ekspertiza = !!value.ekspertiza ? value.ekspertiza : edited.ekspertiza;
    edited.email = value.email;
    edited.prezime = !!value.lastName ? value.lastName: edited.prezime;
    edited.ime = value.firstName;
    edited.telefon = value.telefon;
    this.modalRef.hide();
    this.toastr.success("Konsultant uspješno ažuriran");
    window.localStorage.setItem("konsultanti", JSON.stringify(this.konsultanti));

    return;
    }
  }
}
