import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL = 'http://localhost:5000';

  constructor(private readonly http: HttpClient) {}

  nomagent(): Observable<{ tables: string[] }>{
    return of({ tables: ['sunny', 'koyes', 'Riob', 'Rayhan', 'Hasan', 'Raju'] });
  }
}
