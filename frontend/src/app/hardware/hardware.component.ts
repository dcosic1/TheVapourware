import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Package } from '../models/package';
import { HardwareService } from './hardware.service';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.css']
})
export class HardwareComponent implements OnInit {
  newHardwareForm: FormGroup;
  submitted = false;
  modalRef: BsModalRef;
  packages: Package[];

  constructor(private toastr: ToastrService, private modalService: BsModalService,private hardwareService: HardwareService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.hardwareService.getPackages().subscribe(
      packages => {
        this.packages = packages;
      },
    );

    this.newHardwareForm = this.formBuilder.group({
      naziv: ['',Validators.required],
      opis: ['',Validators.required],
      tip: ['',Validators.required]
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onAddPackage(){
    this.submitted = true;
    if(this.newHardwareForm.valid){
      let formvalue = this.newHardwareForm.value;
      var pck = new Package();
      pck.Description = formvalue.opis;
      pck.Title = formvalue.naziv;
      pck.Type = formvalue.tip;
      this.packages.push(pck);
      this.toastr.info("Paket uspješno dodan", 'Success');
      this.modalRef.hide();  
      this.newHardwareForm.reset();
      this.submitted = false;
    }
  }

}
