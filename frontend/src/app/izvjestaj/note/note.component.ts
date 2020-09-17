import { Component, OnInit, TemplateRef } from "@angular/core";
import { Note } from "src/app/models/note.model";
import { IzvjestajService } from "../izvjestaj.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, NgForm, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"]
})
export class NoteComponent implements OnInit {
  notes: Note[];
  modalRef: BsModalRef;
  submitted = false;
  izvjestajForm: FormGroup;
  
  constructor(
    private izvjestajService: IzvjestajService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    modalRef: BsModalRef;
    this.izvjestajService.getNotes().subscribe(notes => {
      this.notes = notes;
    });

    this.izvjestajForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  get f() {
    return this.izvjestajForm.controls;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  showToaster() {
    this.toastr.success("Izvjestaj je uspjesno kreiran!");
  }

  onSubmit() {
    this.submitted = true;

    if (this.izvjestajForm.invalid) {
      return;
    }
    let id = this.notes.length + 1;
    let izvjestaj = new Note(id, this.f.title.value, this.f.description.value);
    // izvjestaj.noteId = id;
    // izvjestaj.title = this.f.title.value;
    // izvjestaj.description = this.f.description.value;

    this.notes.push(izvjestaj);
    this.modalRef.hide();
    this.showToaster();
  }
}
