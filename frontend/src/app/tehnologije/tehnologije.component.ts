import { Component, OnInit } from "@angular/core";
import { TehnologijeService } from "./tehnologije.service";
import { Tehnologije } from "../models/tehnologije.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-tehnologije",
  templateUrl: "./tehnologije.component.html",
  styleUrls: ["./tehnologije.component.css"]
})
export class TehnologijeComponent implements OnInit {
  tehnologije: Tehnologije;

  constructor(
    private tehnologijeService: TehnologijeService,
    private toastr: ToastrService
  ) {}

  showToaster() {
    this.toastr.success("Uspjesno ste poslali zahtjev!");
  }

  ngOnInit() {
    this.tehnologijeService.getTehnologije().subscribe(Tehnologije => {
      this.tehnologije = Tehnologije;
    });
  }
}
