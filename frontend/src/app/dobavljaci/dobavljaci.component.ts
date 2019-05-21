import { Component, OnInit, OnChanges } from '@angular/core';
import { DobavljaciService } from './dobavljaci.service';
import { Dobavljaci } from '../models/dobavljaci.model';

@Component({
  selector: 'app-dobavljaci',
  templateUrl: './dobavljaci.component.html',
  styleUrls: ['./dobavljaci.component.css']
})


export class DobavljaciComponent implements OnInit {

    constructor(private serviceDobavljaci:DobavljaciService) { }
    dobavljaci: Dobavljaci[]=[]
    showMe: boolean = false;
    dobavljac: Dobavljaci;

    handleStarsClick(dobavljac){
      this.showMe = true;
      this.dobavljac = dobavljac;
      console.log(dobavljac)
    }
    showMeChangedHandler($event){
      this.showMe = false;
    }
    dobavljacChangedHandler($event){
      for(var i = 1; i<this.dobavljaci.length; i++){
        if(this.dobavljaci[i].nazivFirme == this.dobavljac.nazivFirme){
          this.dobavljaci[i] = this.dobavljac;
        }
      }
      console.log(this.dobavljaci);
    }
    ngOnInit() {
      this.serviceDobavljaci.getDobavljaci().subscribe(
        Dobavljaci => {
            this.dobavljaci = Dobavljaci;
            for(var i = 1; i<this.dobavljaci.length; i++){
              var sum = 0;
              for( var j = 0; j < this.dobavljaci[i].listaOcjena.length; j++ ){
                  sum += this.dobavljaci[i].listaOcjena[j]; 
              }

              this.dobavljaci[i].ocjena = sum/this.dobavljaci[i].listaOcjena.length;
            }
        }
      
    );

      
    }
  
  }
  
