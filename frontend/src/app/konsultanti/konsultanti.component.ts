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

    this.konsultanti = JSON.parse(window.localStorage.getItem("konsultanti"));
    this.registerForm = this.formBuilder.group({
      firstName: [, Validators.required],
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
    this.registerForm = this.formBuilder.group({
      firstName: konsultant.ime,
      lastName: konsultant.prezime,
      email: konsultant.email,
      telefon: konsultant.telefon,
      ekspertiza: konsultant.ekspertiza,
      projekat: konsultant.projekat
    });
    this.konsultant = konsultant;
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

  onDelete() {
    this.konsultanti.splice(this.konsultanti.findIndex(x => x.id ==  this.consultantId), 1);
    this.modalRef.hide();
    window.localStorage.setItem("konsultanti", JSON.stringify(this.konsultanti));
    this.showToasterdDelete()
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
