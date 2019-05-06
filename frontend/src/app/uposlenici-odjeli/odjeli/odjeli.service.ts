import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Odjel } from 'src/app/models/odjel.imodel';



@Injectable({
    providedIn: 'root'
})
export class OdjeliService {
    private odjeliUrl = '../../assets/api/odjeli.json'; 

    constructor(private http: HttpClient) { }

    getOdjel(): Observable<Odjel[]> {
        return this.http.get<Odjel[]>(this.odjeliUrl);
    }
 
}