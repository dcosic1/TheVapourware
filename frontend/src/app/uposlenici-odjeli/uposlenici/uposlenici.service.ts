import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Uposlenik } from 'src/app/models/uposlenici.model';


@Injectable({
    providedIn: 'root'
})
export class UposleniciService {
    private uposleniciUrl = '../../assets/api/uposlenici.json'; 

    constructor(private http: HttpClient) { }

    getUposlenici(): Observable<Uposlenik[]> {
        return this.http.get<Uposlenik[]>(this.uposleniciUrl);
    }
 
}