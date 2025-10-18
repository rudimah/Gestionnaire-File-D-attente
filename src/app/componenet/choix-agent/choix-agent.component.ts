import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TableAgent } from '../../models/table';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choix-agent',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './choix-agent.component.html',
  styleUrl: './choix-agent.component.css'
})
export class ChoixAgentComponent {
  private readonly apiService = inject(ApiService)
  constructor(
    private readonly router: Router,
  ) {}
  

  nomAgents : Observable<TableAgent[]> = this.apiService.nomAgent().pipe(
    map(response => response.data)
  );

  redirection(agent:number){
    this.router.navigate(['/agent', agent])
  }
}
