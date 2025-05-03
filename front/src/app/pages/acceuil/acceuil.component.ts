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
    this.nomAgents = this.apiService.nomAgent().pipe(
      map(response => response.data)
    );
  }

  genTicket(nom: string): void {
    this.apiService.genTicket(nom).subscribe({
      next: (response) => {
        const ticket = response.data;  // Récupère le ticket renvoyé par l'API
        console.log("Ticket généré:", ticket);  // Tu peux l'utiliser comme tu veux
      },
      error: (error) => {
        console.error("Erreur lors de la génération du ticket:", error);
      }
    });
  }

}
