import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Konsultanti } from '../models/konsultanti.model';
import { Finansije } from '../models/finansije.model';


@Injectable({
    providedIn: 'root'
})
export class FinansijeService {
    private finansijeUrl = '../../assets/api/finansije.json'; 

    constructor(private http: HttpClient) { }

    getFinansije(): Observable<Finansije> {
        return this.http.get<Finansije>(this.finansijeUrl);
    }
    
}