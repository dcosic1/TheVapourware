import { Component, OnInit } from '@angular/core';
import { ProjektiService } from './projekti.service';
import { Projekti } from '../models/projekti.model';

@Component({
  selector: 'app-projekti',
  templateUrl: './projekti.component.html',
  styleUrls: ['./projekti.component.css']
})
export class ProjektiComponent implements OnInit {

  constructor(private projektiService:ProjektiService) { }

  prikaziDetalje=false
  projekti:Projekti[]=[]

  detaljiProjektaClick():void{
    this.prikaziDetalje=!this.prikaziDetalje
  }

  ngOnInit() {
    this.projektiService.getProjekti().subscribe(
      projekti=>this.projekti=projekti
      );
  }

}
