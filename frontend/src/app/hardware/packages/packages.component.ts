import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/models/package';
import { HardwareService } from '../hardware.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  packages: Package[];
  filteredPackages: Package[];
  errorMessage = '';

  constructor(private hardwareService: HardwareService) { }

  ngOnInit() {
    this.hardwareService.getPackages().subscribe(
      packages => {
          this.packages = packages;
          this.filteredPackages = this.packages;
      },
      error => this.errorMessage = <any>error
  );
  }

}
