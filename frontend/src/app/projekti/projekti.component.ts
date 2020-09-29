import { Component, OnInit, TemplateRef } from "@angular/core";
import { ProjektiService } from "./projekti.service";
import { Projekti } from "../models/projekti.model";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import * as moment from 'moment';
@Component({
  selector: "app-projekti",
  templateUrl: "./projekti.component.html",
  styleUrls: ["./projekti.component.css"],
})
export class ProjektiComponent implements OnInit {
  constructor(
    private projektiService: ProjektiService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  public selektovaniProjekt = null;
  public editProject = null;
  public registerForm: FormGroup;
  public submitted = false;
  prikaziDetalje: Record<string, boolean> = {};
  projekti: Projekti[] = [];
  modalRef: BsModalRef;
  editModalRef: BsModalRef;
  ref:  BsModalRef;

  openModal(template: TemplateRef<any>, projekat: Projekti) {
    this.modalRef = this.modalService.show(template);
    if (!!projekat) this.selektovaniProjekt = projekat;
  }

  hideModal() {
    this.modalRef.hide();
  }

  openEditModal(template: TemplateRef<any>, projekat: Projekti) {
    this.editModalRef = this.modalService.show(template);
    if (!!projekat) this.editProject = projekat;
    this.registerForm = this.formBuilder.group({
      naziv: projekat.naziv,
      pocetak: moment(projekat.pocetakProjekta).format('YYYY-MM-DD'),
      kraj:  moment(projekat.krajProjekta).format('YYYY-MM-DD'),
      tehnologija: projekat.tehnologija,
      prihodi: projekat.prihodi,
      troskovi: projekat.troskovi,
    });
  }

  hideEditModal() {
    this.editModalRef.hide();
  }

  openNewModal(template: TemplateRef<any>) {
    this.ref = this.modalService.show(template);
  }
  hideNewModal() {
    this.editModalRef.hide();
  }

  onNewSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.registerForm)
      return;
    }
    let projekat = {
      naziv: this.registerForm.controls.naziv.value,
      pocetakProjekta: this.registerForm.controls.pocetak.value,
      krajProjekta: this.registerForm.controls.kraj.value,
      tehnologija: this.registerForm.controls.tehnologija.value,
      prihodi: this.registerForm.controls.prihodi.value,
      troskovi: this.registerForm.controls.troskovi.value,
    };
    this.projekti.push({
     id: this.projekti.length,
      ...projekat,
    });
    window.localStorage.setItem("projekti", JSON.stringify(this.projekti));
    this.hideNewModal();
    this.showToasterNew();
    this.submitted = false;
  }
  showToasterEdit() {
    this.toastr.success("Projekat je uspjesno uredjen!");
  }
  showToasterDelete() {
    this.toastr.success("Projekat je uspjesno izbrisan!");
  }
  showToasterNew() {
    this.toastr.success("Projekat je uspjesno dodan!");
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let projekat = {
      naziv: this.registerForm.controls.naziv.value,
      pocetakProjekta: this.registerForm.controls.pocetak.value,
      krajProjekta: this.registerForm.controls.kraj.value,
      tehnologija: this.registerForm.controls.tehnologija.value,
      prihodi: this.registerForm.controls.prihodi.value,
      troskovi: this.registerForm.controls.troskovi.value,
    };
    this.projekti[this.projekti.findIndex(p => p.id === this.editProject.id)] = {
      ...this.editProject,
      ...projekat,
    };
    window.localStorage.setItem("projekti", JSON.stringify(this.projekti));
    this.hideEditModal();
    this.showToasterEdit();
    this.submitted = false;
  }

  public detaljiProjektaClick(naziv: string): void {
    this.prikaziDetalje[naziv] = !this.prikaziDetalje[naziv];
  }

  public onDelete(projekat: Projekti){
    this.projekti.splice(this.projekti.findIndex(p => p.id === projekat.id),1);
    window.localStorage.setItem("projekti", JSON.stringify(this.projekti));
    // this.hideEditModal();
    this.showToasterDelete();
  }

  ngOnInit() {
    const oldProjects = window.localStorage.getItem("projekti");
    if (!oldProjects)
      this.projektiService.getProjekti().subscribe((projekti) => {
        window.localStorage.setItem("projekti", JSON.stringify(projekti));
        this.projekti = projekti;
        projekti.forEach((el) => (this.prikaziDetalje[el.naziv] = false));
      });
    else this.projekti = JSON.parse(oldProjects);

    this.registerForm = this.formBuilder.group({
      naziv: ["", Validators.required],
      pocetak: ["", Validators.required],
      kraj: ["", [Validators.required]],
      tehnologija: ["", Validators.required],
      prihodi: ["", Validators.required],
      troskovi: ["", Validators.required],
    });
    console.log(this.registerForm)
  }
}
