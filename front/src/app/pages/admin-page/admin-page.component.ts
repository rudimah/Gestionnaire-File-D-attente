import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Agent } from '../../models/table';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{
  
  private readonly apiService = inject(ApiService);
  listAgents = new BehaviorSubject<Agent[]>([]);
  lstBureau = new BehaviorSubject<String[]>([])
  modif : number = 0;
  showForm : boolean = false;

  formAgent = new FormGroup({
    idAgent : new FormControl(),
    nomAgent : new FormControl('', [Validators.required]),
    bureau : new FormControl()
  });
  
  ngOnInit(): void {
    this.lstAgents();
    this.lstBureauxDispo();
  }

  lstAgents(){
    
    this.apiService.getAgents().pipe(
      map(response => response.data)
    ).subscribe(
        data => {
          this.listAgents.next([]);
          this.listAgents.next(data)
        }
    );
  }

  lstBureauxDispo() {
    this.apiService.getBureauDispo().pipe(
      map(response => response.data)
    ).subscribe(
      data => this.lstBureau.next(data)
    )
  }

  ajoutAgent(){
    if (this.formAgent.valid){
      if(this.modif){
        this.apiService.modif_agent(this.formAgent.value).subscribe({
            next: () => this.lstAgents()
        });
      }else{
        this.apiService.add_agent(this.formAgent.value).subscribe({
          next: () => this.lstAgents()
        });
      }
      this.formAgent.reset();
      this.modif = 0;
      this.showForm = false;
    }
  }

  nouveau(){
    this.formAgent.reset();
    this.modif = 0;
    this.showForm = true;
  }

  modiferAgent(idAgent : number){
  this.modif = idAgent;
  this.showForm = true;
  const agent = this.listAgents.getValue().find(a => a.id === idAgent);
  if (agent) {
    const currentBureaux = this.lstBureau.getValue();

    // Ajout du bureau de l’agent dans la liste si absent
    if (agent.bureau && !currentBureaux.includes(agent.bureau)) {
      this.lstBureau.next([...currentBureaux, agent.bureau]);
    }

    // Patch la valeur du formulaire, incluant le bureau correct
    this.formAgent.patchValue({
      idAgent : agent.id,
      nomAgent : agent.nom,
      bureau : agent.bureau ?? ''  // Si bureau null, mettre ''
    });
  }
}


  suppprimerAgent(){
    this.apiService.supprimerAgent(this.modif).subscribe({
          next: () => {
            this.lstAgents();
            this.formAgent.reset();
            this.showForm = false;
          }
    }); 
  }

  fermerForm(){
    this.showForm = false;
  }

}
