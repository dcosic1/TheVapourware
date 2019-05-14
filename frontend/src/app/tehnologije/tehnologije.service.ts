import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Tehnologije } from '../models/tehnologije.model';

@Injectable({
  providedIn: 'root'
})
export class TehnologijeService {

private tehnologijeURL = '../../assets/api/tehnologije.json';
  constructor(private http: HttpClient) { }

  getTehnologije(): Observable<Tehnologije> {
      return this.http.get<Tehnologije>(this.tehnologijeURL);
  }
}
