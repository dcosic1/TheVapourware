import { Component, OnInit } from '@angular/core';
import { KonsultantiService } from './konsultanti.service';
import { Konsultanti } from '../models/konsultanti.model';

@Component({
  selector: 'app-konsultanti',
  templateUrl: './konsultanti.component.html',
  styleUrls: ['./konsultanti.component.css']
})
export class KonsultantiComponent implements OnInit {

  constructor(private serviceKonsultanti:KonsultantiService) { }
  konsultanti: Konsultanti[]=[]

  ngOnInit() {
    this.serviceKonsultanti.getKonsultanti().subscribe(
      konsultanti => {
          this.konsultanti = konsultanti;
         
      }
  );
  }

}
