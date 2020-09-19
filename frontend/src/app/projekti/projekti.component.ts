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

  prikaziDetalje: Record<string, boolean>={}
  projekti:Projekti[]=[]

  public detaljiProjektaClick(naziv: string):void{
    this.prikaziDetalje[naziv]=!this.prikaziDetalje[naziv]
  }

  ngOnInit() {
    this.projektiService.getProjekti().subscribe(
      projekti=>{this.projekti=projekti; projekti.forEach(el => this.prikaziDetalje[el.naziv] = false)}
      );
  }

}
