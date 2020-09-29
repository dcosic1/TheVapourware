import { Component, OnInit, TemplateRef } from "@angular/core";
import { ProjektiService } from "./projekti.service";
import { Projekti } from "../models/projekti.model";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import * as moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  deleteModalRef: BsModalRef;
  ref:  BsModalRef;
  projectToDelete: any = null;
  dropdownSettings: IDropdownSettings;
  dropdownList: any;
  selectedItems: any;

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
    this.selectedItems = projekat.konsultanti;
    console.log(' this.selectedItems', this.selectedItems)
    this.registerForm = this.formBuilder.group({
      naziv: projekat.naziv,
      pocetak: moment(projekat.pocetakProjekta).format('YYYY-MM-DD'),
      kraj:  moment(projekat.krajProjekta).format('YYYY-MM-DD'),
      tehnologija: projekat.tehnologija,
      prihodi: projekat.prihodi,
      troskovi: projekat.troskovi,
      selectedItems: projekat.konsultanti,
    });
  }

  hideEditModal() {
    this.editModalRef.hide();
  }

  openNewModal(template: TemplateRef<any>) {
    this.ref = this.modalService.show(template);
  }
  hideNewModal() {
    this.ref.hide();
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
      konsultanti: this.dropdownList.filter(el => !!this.selectedItems.find(s => s.id === el.id))
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
    this.toastr.success("Projekat je uspjesno ažuriran!");
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
      konsultanti: this.dropdownList.filter(el => !!this.selectedItems.find(s => s.id === el.id))

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

  public onDelete(){
    this.projekti.splice(this.projekti.findIndex(p => p.id === this.projectToDelete.id),1);
    window.localStorage.setItem("projekti", JSON.stringify(this.projekti));
    this.hideDeleteModal();
    this.showToasterDelete();
  }

  openModalDelete(template: TemplateRef<any>, projekat: any) {
    this.projectToDelete = projekat;
    this.deleteModalRef = this.modalService.show(template);
  }
  hideDeleteModal(){
    this.deleteModalRef.hide()
  }

  onItemSelect(item: any) {
    console.log(item);
    (this.selectedItems || []).push(item)
  }
  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems = (this.selectedItems || []).concat(items)

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

    const oldConsultants = window.localStorage.getItem("konsultanti");
    if (!oldConsultants)
    this.projektiService.getKonsultanti().subscribe((k) => {
      window.localStorage.setItem("konsultanti", JSON.stringify(k));
      this.dropdownList = k;
    });
    else this.dropdownList = JSON.parse(oldConsultants);

    this.registerForm = this.formBuilder.group({
      naziv: ["", Validators.required],
      pocetak: ["", Validators.required],
      kraj: ["", [Validators.required]],
      tehnologija: ["", Validators.required],
      prihodi: ["", Validators.required],
      troskovi: ["", Validators.required],
      selectedItems:[]
    });
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

  }
}
