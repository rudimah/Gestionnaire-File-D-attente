import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL = 'http://localhost:5000';

  constructor(private readonly http: HttpClient) {}

  nomAgent(): Observable<{ data: string[] }>{
    return this.http.get<{data: string[]}>(`${this.API_URL}/agents`);
  }

  genTicket(nom: string): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(`${this.API_URL}/agents/gen/${nom}`);
  }
    
}
