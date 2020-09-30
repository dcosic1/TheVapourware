import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Dobavljaci } from './models/dobavljaci.model';
import { Konsultanti } from './models/konsultanti.model';
import { Package } from './models/package';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  private projektiURL = '../../assets/api/projekti.json';
  private konsultantiUrl = '../../assets/api/konsultanti.json'; 
  private dobavljaciUrl = '../../assets/api/dobavljaci.json'; 
  private productUrl = '../../assets/api/hardwarePackages.json'; // postaviti link servera
  
  constructor(private http: HttpClient){
    this.http.get<Package[]>(this.projektiURL).subscribe(data => {
      window.localStorage.setItem("projekti", JSON.stringify(data));
      //return this.http.get<Dobavljaci[]>(JSON.parse(window.localStorage.getItem("dobavljaci")));
    });
      this.http.get<Konsultanti[]>(this.konsultantiUrl).subscribe(data => {
        window.localStorage.setItem("konsultanti", JSON.stringify(data));
        //return this.http.get<Dobavljaci[]>(JSON.parse(window.localStorage.getItem("dobavljaci")));
      });
        this.http.get<Dobavljaci[]>(this.dobavljaciUrl).subscribe(data => {
          window.localStorage.setItem("dobavljaci", JSON.stringify(data));
          //return this.http.get<Dobavljaci[]>(JSON.parse(window.localStorage.getItem("dobavljaci")));
  

    }); 
    this.http.get<Package[]>(this.productUrl).subscribe(data => {
      window.localStorage.setItem("hardware", JSON.stringify(data));
      //return this.http.get<Dobavljaci[]>(JSON.parse(window.localStorage.getItem("dobavljaci")));

  }); 

  }
}
