import { Component, OnInit } from '@angular/core';
import { UposleniciService } from './uposlenici.service';
import { Uposlenik } from 'src/app/models/uposlenici.model';


@Component({
  selector: 'app-uposlenici',
  templateUrl: './uposlenici.component.html',
  styleUrls: ['./uposlenici.component.css']
})
export class UposleniciComponent implements OnInit {

  constructor(private uposleniciService: UposleniciService) { }
  uposlenici: Uposlenik[]=[]
  ngOnInit() {
    this.uposleniciService.getUposlenici().subscribe(
      uposlenici => {
          this.uposlenici = uposlenici;
         
      }
  );
  }

}
