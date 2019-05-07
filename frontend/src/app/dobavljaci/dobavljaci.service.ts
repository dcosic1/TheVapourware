import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Dobavljaci } from '../models/dobavljaci.model';
import { async } from 'q';


@Injectable({
    providedIn: 'root'
})
export class DobavljaciService {
    private dobavljaciUrl = '../../assets/api/dobavljaci.json'; 

    constructor(private http: HttpClient) { }

    getDobavljaci(): Observable<Dobavljaci[]> {
        return this.http.get<Dobavljaci[]>(this.dobavljaciUrl);
    }
   

   
    
}