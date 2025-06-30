import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Agent, Client, ClientEnAttente, TableAgent, Ticket } from '../models/table';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL = 'http://localhost:8000';

  constructor(private readonly http: HttpClient) {}

  nomAgent(): Observable<{ data: TableAgent[] }>{
    return this.http.get<{data: [number, string][]}>(`${this.API_URL}/agents`).pipe(
      map(response=>({
        data: response.data.map(([id, nom]) => ({
          id, 
          nom
        }))
      }))
    );
  }

  genTicket(id_agent: number): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(`${this.API_URL}/clients/gen/${id_agent}`);
  }

  get_client_en_attente(): Observable<{ data: ClientEnAttente[] }> {
    return this.http.get<{ data: [number, string, string, string, string, string, string, number][] }>(`${this.API_URL}/clients/list`).pipe(
      map(response => ({
        data: response.data.map(([id_client, nom, sujet, heure, agent, prix, mdp, etat]) => ({
          id_client,
          nom,
          sujet,
          heure,
          agent,
          prix,
          mdp,
          etat
        }))
      }))
    );
  }

  add_client(donnee: object): Observable<object>{
    return this.http.post<{ data: string }>(`${this.API_URL}/clients/add`, donnee); 
  }

  getClient(id_agent: number): Observable<Client> {
    return this.http.get<{ data: [number, string, string, string, any, string, number] }>(`${this.API_URL}/agents/${id_agent}/client`).pipe(
      map(response => {
        const d = response.data;
        return {
          id: d[0],
          nom: d[1],
          sujet: d[2],
          agent: d[3],
          prix: d[4],
          mdp: d[5]
        };
      })
    );
  }

  getClientById(id_client: number): Observable<Client> {
    return this.http.get<{ data: [number, string, string, string, any, string, number] }>(`${this.API_URL}/clients/${id_client}`).pipe(
      map(response => {
        const d = response.data;
        return {
          id: d[0],
          nom: d[1],
          sujet: d[2],
          agent: d[3],
          prix: d[4],
          mdp: d[5]
        };
      })
    );
  }

  nextClient(id_agent: number): Observable<Client> {
    return this.http.get<{ data: [number, string, string, string, any, string, number] }>(`${this.API_URL}/agents/${id_agent}/next`).pipe(
      map(response => {
        const d = response.data;
        return {
          id: d[0],
          nom: d[1],
          sujet: d[2],
          agent: d[3],
          prix: d[4],
          mdp: d[5]
        };
      })
    );
  }

  callClient(id_agent: number){
    return this.http.get<{}>(`${this.API_URL}/agents/${id_agent}/call`)
  }

  getTicket(): Observable<Ticket[]> {
    return this.http.get<{ data: [number, string][] }>(`${this.API_URL}/ecran`).pipe(
      map(response => {
        return response.data.map(d => ({
          client: d[0],
          box: d[1]
        }));
      })
    );
  }

  getAgents(): Observable<{data: Agent[]}>{
    return this.http.get<{data : [number, string, string][]}>(`${this.API_URL}/agents/liste`).pipe(
      map( response => ({
        data: response.data.map(([id, nom, bureau])=> ({
          id,
          nom,
           bureau
        }))
      }))
    )
  }

  
}
