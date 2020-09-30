import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Package } from '../models/package';
import { Konsultanti } from '../models/konsultanti.model';


@Injectable({
    providedIn: 'root'
})
export class KonsultantiService {
    private konsultantiUrl = '../../assets/api/konsultanti.json'; 

    constructor(private http: HttpClient) {
        this.http.get<Konsultanti[]>(this.konsultantiUrl).subscribe(data => {
            window.localStorage.setItem("konsultanti", JSON.stringify(data));
            //return this.http.get<Dobavljaci[]>(JSON.parse(window.localStorage.getItem("dobavljaci")));
    
        }); 

     }

    getKonsultanti(): Observable<Konsultanti[]> {
        return this.http.get<Konsultanti[]>(this.konsultantiUrl);
    }

   
    
}