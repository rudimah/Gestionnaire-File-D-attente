import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DisplayTicketComponent } from '../../componenet/display-ticket/display-ticket.component';
import { ClientEnAttente } from '../../models/table';
import { FormClientComponent } from '../../componenet/form-client/form-client.component';
import { AfiichageClientComponent } from '../../componenet/afiichage-client/afiichage-client.component';

@Component({
  selector: 'app-acceuil',
  imports: [FormClientComponent, AfiichageClientComponent],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {

  private readonly apiService = inject(ApiService);
  
  listClient = new BehaviorSubject<ClientEnAttente[]>([]);
  ticket: string = "";

  ajoutClient(data: object) {
    this.apiService.add_client(data).subscribe({
      next: () => this.loadClients()
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.apiService.get_client_en_attente().pipe(
      map(response => response.data)).subscribe(
        data => this.listClient.next(data));
  }
}

