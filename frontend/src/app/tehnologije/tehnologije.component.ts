import { Component, OnInit } from "@angular/core";
import { TehnologijeService } from "./tehnologije.service";
import { Tehnologije } from "../models/tehnologije.model";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-tehnologije",
  templateUrl: "./tehnologije.component.html",
  styleUrls: ["./tehnologije.component.css"]
})
export class TehnologijeComponent implements OnInit {
  tehnologije: Tehnologije;
  tehnologijeForm: FormGroup;
  submitted = false;

  constructor(
    private tehnologijeService: TehnologijeService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  showToaster() {
    this.toastr.success("Uspjesno ste poslali zahtjev!");
  }

  ngOnInit() {
    this.tehnologijeService.getTehnologije().subscribe(Tehnologije => {
      this.tehnologije = Tehnologije;
    });

    this.tehnologijeForm = this.formBuilder.group({
      projekat: ["", Validators.required],
      trenutnaTehnologija: ["", Validators.required],
      novaTehnologija: ["", [Validators.required, Validators.email]],
      potrebnaZnanja: ["", Validators.required],
      razlog: ["", Validators.required],
      nadlezna: ["", Validators.required]
    });
  }
  get f() {
    return this.tehnologijeForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.tehnologijeForm.invalid) {
      console.log("tehnoooo")
      return;
    }
    this.showToaster();
  }
}
