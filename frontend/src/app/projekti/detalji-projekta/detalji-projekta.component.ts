import { Component, OnInit, Input } from '@angular/core';
import { Projekti } from 'src/app/models/projekti.model';

@Component({
  selector: 'app-detalji-projekta',
  templateUrl: './detalji-projekta.component.html',
  styleUrls: ['./detalji-projekta.component.css']
})
export class DetaljiProjektaComponent implements OnInit {

  constructor() { }
  prikaziDetalje=false;
  urediTim=false;
  @Input() project:Projekti;

  detaljiProjektaClick():void{
    this.prikaziDetalje=!this.prikaziDetalje
  }
  urediTimClick(): void{
    this.urediTim=!this.urediTim;
  }
  ngOnInit() {
  }

}
