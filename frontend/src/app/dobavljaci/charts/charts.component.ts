import { Component, OnInit } from '@angular/core';
import { DobavljaciService } from '../dobavljaci.service';
import { Dobavljaci } from '../../models/dobavljaci.model';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor() { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ["Kvaliteta usluge"];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [2.3], label: 'Firma1'},
    {data: [4.2], label: 'Firma2'},
    {data: [3.5], label: 'Firma3'}
  ];
  ngOnInit() {
  }
  // dobavljaci: Dobavljaci[]=[]
  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels = [];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [{data: 0, label:""}];
  

  // async ngOnInit() {
  //   this.dobavljaci= await this.serviceDobavljaci.getDobavljaci().toPromise();
  // for(var i=0;i<this.dobavljaci.length;i++){
  //   this.barChartLabels.push(this.dobavljaci[i].nazivFirme);
    
  //   this.barChartData.push({data: this.dobavljaci[i].ocjena, label: this.dobavljaci[i].nazivFirme})
  // }
  
  // }
  

}
