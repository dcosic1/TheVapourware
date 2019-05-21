import { Component, OnChanges, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Dobavljaci } from 'src/app/models/dobavljaci.model';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnChanges, OnInit {
  @Input() showMe: boolean;
  @Input() dobavljac: Dobavljaci
  
  @Output() showMeChanged: EventEmitter<boolean> = new EventEmitter()
  @Output() dobavljacChanged: EventEmitter<Dobavljaci> = new EventEmitter()

  handleSaveClick(novaListOcjena) {
    this.showMe = false;
    this.showMeChanged.emit(this.showMe);
    this.dobavljac.listaOcjena=novaListOcjena;
    var sum = 0;
    for( var j = 0; j < novaListOcjena.length; j++ ){
      sum += Number(novaListOcjena[j]); 
    }
    this.dobavljac.ocjena = sum/novaListOcjena.length;
    this.dobavljacChanged.emit(this.dobavljac);
    console.log("nova lista", novaListOcjena);
  }

  ngOnChanges(): void {
    this.showMe = true;
  }

  ngOnInit(){
    console.log("ovo je dobavljac",this.dobavljac);
  }
}
