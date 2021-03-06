import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Package } from '../models/package';
import { Konsultanti } from '../models/konsultanti.model';
import { Projekti } from '../models/projekti.model';


@Injectable({
    providedIn: 'root'
})
export class ProjektiService {
    private projektiURL = '../../assets/api/projekti.json'; 
    private konsultantiURL = '../../assets/api/konsultanti.json'

    constructor(private http: HttpClient) {

        this.http.get<Package[]>(this.projektiURL).subscribe(data => {
            window.localStorage.setItem("projekti", JSON.stringify(data));
            //return this.http.get<Dobavljaci[]>(JSON.parse(window.localStorage.getItem("dobavljaci")));
    
        }); 

        this.http.get<Konsultanti[]>(this.konsultantiURL).subscribe(data => {
            window.localStorage.setItem("konsultanti", JSON.stringify(data));
            //return this.http.get<Dobavljaci[]>(JSON.parse(window.localStorage.getItem("dobavljaci")));
    
        }); 
     }


    getProjekti(): Observable<Projekti[]> {
        return this.http.get<Projekti[]>(this.projektiURL);
    }

    getKonsultanti(): Observable<Konsultanti[]> {
        return this.http.get<Konsultanti[]>(this.konsultantiURL);
    }
    
}