import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormClientComponent } from '../../componenet/form-client/form-client.component';
import { Client, ClientEnAttente } from '../../models/table';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { AfiichageClientComponent } from '../../componenet/afiichage-client/afiichage-client.component';

@Component({
  selector: 'app-agent-page',
  imports: [FormClientComponent, CommonModule, AfiichageClientComponent],
  templateUrl: './agent-page.component.html',
  styleUrls: ['./agent-page.component.css']
})
export class AgentPageComponent implements OnInit {
  id_agent!: number;
  client!: Client | null;
  private readonly apiService = inject(ApiService);
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  listClient = new BehaviorSubject<ClientEnAttente[]>([]);

  ngOnInit(): void {
    this.id_agent = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getclient();
    this.getClientsEnAttente();
  }

  private getClientsEnAttente(): void {
      this.apiService.get_client_en_attente_agent(this.id_agent).pipe(
        map(response => response.data)
      ).subscribe(
          data => this.listClient.next(data)
        );
    }

  getclient(){
    this.apiService.getClient(this.id_agent).subscribe(client => {
      this.client = client;
    }); 
  }
  
  onNext(): void {
    this.apiService.nextClient(this.id_agent).subscribe(client => {
      this.client = client;
    })
  }

  call(){
    this.apiService.callClient(this.id_agent).subscribe();;
  }
  
  updateClient(data:object){
    this.apiService.add_client(data).subscribe({
      next: () => {
        this.onNext(); 
      }
    });
  }

}
