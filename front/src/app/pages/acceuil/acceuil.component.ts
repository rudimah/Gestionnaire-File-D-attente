import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-acceuil',
  imports: [AsyncPipe],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit{

  private readonly apiService = inject(ApiService);
  nomAgents : Observable<string[]> = new BehaviorSubject<string[]>([]);

  ngOnInit(): void {
    this.nomAgents = this.apiService.nomagent().pipe(
      map(response => response.tables)
    );
  }

  genTicket(nom: string){
    console.log(nom);
  }

}
