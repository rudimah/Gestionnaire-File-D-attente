import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Client, TableAgent } from '../../models/table';
import { AsyncPipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-form-client',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './form-client.component.html',
  styleUrl: './form-client.component.css'
})
export class FormClientComponent {
  private readonly apiService = inject(ApiService);

  @Output() ajoutclient = new EventEmitter<Client>();
  @Output() close_affichage = new EventEmitter();
  clientExist : boolean = false;
  private clientSubject = new BehaviorSubject<Client | null>(null);
  id_client = 0;
  
  @Input() set client(value: Client | null) {
    if (value) {
      this.clientExist = true;
      this.id_client = value.id;
      this.clientSubject.next(value);
      this.clientForm.patchValue({
        idClient: value.id,
        nom: value.nom,
        sujet: value.sujet,
        agent_souhaite: value.agent.toString(),
        prix: value.prix,
        Moyen_de_paiment: value.mdp
      });
    }
  }
  
  @Input() mode!: string;

  nomAgents: Observable<TableAgent[]> = this.apiService.nomAgent().pipe(
    map(response => response.data)
  );

  clientForm = new FormGroup({
    idClient: new FormControl(),
    nom: new FormControl('', [Validators.required]),
    sujet: new FormControl('', [Validators.required]),
    agent_souhaite: new FormControl('', [Validators.required]),
    prix: new FormControl(),
    Moyen_de_paiment: new FormControl(),
  });

  ajout() {
    if (this.clientForm.valid) {
      this.ajoutclient.emit(this.clientForm.value as Client);
      this.clientForm.reset();
      this.close_affichage.emit();
    }
  }

  supprimerClient(){
    if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      if (this.id_client!=0){
        this.apiService.supprimerClient(this.id_client).subscribe({
          next :()=>{
            this.close_affichage.emit();
          }
        })
      }
    }
  }

  close(){
    this.close_affichage.emit();
  }

}

