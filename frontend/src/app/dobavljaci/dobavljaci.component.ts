import { Component, OnInit } from '@angular/core';
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
  
    ngOnInit() {
      this.serviceDobavljaci.getDobavljaci().subscribe(
        Dobavljaci => {
            this.dobavljaci = Dobavljaci;
        }
    );
    }
  
  }
  
