import { Component, OnInit, TemplateRef } from "@angular/core";
import { KonsultantiService } from "./konsultanti.service";
import { Konsultanti } from "../models/konsultanti.model";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Projekti } from "../models/projekti.model";
import { ProjektiService } from "../projekti/projekti.service";

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
  projekti: string[] = [];
  konsultantNOVI: Konsultanti;

  constructor(
    private serviceKonsultanti: KonsultantiService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private projektiService: ProjektiService
  ) {}
  konsultanti: Konsultanti[] = [];
  konsultant: Konsultanti;

  ngOnInit() {
    this.serviceKonsultanti.getKonsultanti().subscribe(konsultanti => {
      this.konsultanti = konsultanti;
    });

    this.projekti = this.projektiService.getPo();

    this.registerForm = this.formBuilder.group({
      firstName: [, Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telefon: ["", Validators.required],
      projekat: ["", Validators.required],
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

  onSubmit() {
    this.submitted = true;

    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telefon: ["", Validators.required],
      projekat: ["", Validators.required],
      ekspertiza: ["", Validators.required]
    });
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let id = this.konsultanti.length + 1;
    let konsultant = new Konsultanti(
      id,
      this.f.firstName.value,
      this.f.lastName.value,
      this.f.telefon.value,
      this.f.email.value,
      this.f.ekspertiza.value,
      this.f.projekat.value
    );
    this.konsultanti.push(konsultant);
    this.modalRef.hide();
    this.showToaster();
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  openModal(template: TemplateRef<any>, konsultant: Konsultanti) {
    this.modalRef = this.modalService.show(template);
    this.registerForm = this.formBuilder.group({
      firstName: konsultant.ime,
      lastName: konsultant.prezime,
      email: konsultant.email,
      telefon: konsultant.telefon,
      ekspertiza: konsultant.ekspertiza,
      projekat: konsultant.projekat
    });
    this.konsultant = konsultant;
  }


  openNewModal(template: TemplateRef<any>, konsultant: Konsultanti) {
    this.modalRef = this.modalService.show(template);
    this.registerForm = this.formBuilder.group({
      firstName: "",
      lastName: "",
      email: "",
      telefon: "",
      ekspertiza: "",
      projekat: ""
    });
    this.konsultant = konsultant;
  }

  openDelModal(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template);
  }

  onDelete(id: number) {
    this.konsultanti = this.konsultanti.filter(element => element.id != id);
    // this.modalRef2.hide();
    return;
  }

  onEdit() {
    const editovani = this.konsultanti.find(
      kons => kons.id === this.konsultant.id
    );
    const id = editovani.id;
    let konsultantNOVI = new Konsultanti(
      id,
      this.f.firstName.value,
      this.f.lastName.value,
      this.f.telefon.value,
      this.f.email.value,
      this.f.ekspertiza.value,
      this.f.projekat.value
    );
    this.registerForm = this.formBuilder.group({
      firstName: [konsultantNOVI.ime, Validators.required],
      lastName: [konsultantNOVI.prezime, Validators.required],
      email: [konsultantNOVI.email, [Validators.required, Validators.email]],
      telefon: [konsultantNOVI.telefon, Validators.required],
      projekat: [konsultantNOVI.projekat, Validators.required],
      ekspertiza: [konsultantNOVI.ekspertiza, Validators.required]
    });
    if (this.registerForm.invalid) {
      return;
    }
    this.konsultanti[editovani.id - 1] = konsultantNOVI;
    this.modalRef.hide();
    return;
  }
}
