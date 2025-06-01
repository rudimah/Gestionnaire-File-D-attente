import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, ClientEnAttente } from '../../models/table';
import { FormClientComponent } from '../form-client/form-client.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-afiichage-client',
  imports: [AsyncPipe, FormClientComponent],
  templateUrl: './afiichage-client.component.html',
  styleUrl: './afiichage-client.component.css'
})
export class AfiichageClientComponent {
  client!: Client | null;
  private readonly apiService = inject(ApiService);
  modification: boolean = false;
  @Input({required: true}) listClient!: Observable<ClientEnAttente[]>

  getclient(id_client: number){
    this.apiService.getClientById(id_client).subscribe(client => {
      this.client = client;
    }); 
  }

  modifier(id_client : number){
    this.modification = true;
    this.getclient(id_client);
  }
  finModification(){
    this.modification = false;
  }
}
