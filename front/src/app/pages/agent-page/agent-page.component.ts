import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormClientComponent } from '../../componenet/form-client/form-client.component';
import { Client } from '../../models/table';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-page',
  imports: [FormClientComponent, CommonModule],
  templateUrl: './agent-page.component.html',
  styleUrls: ['./agent-page.component.css']
})
export class AgentPageComponent implements OnInit {
  id_agent!: number;
  client!: Client | null;
  private readonly apiService = inject(ApiService);
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id_agent = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getclient();
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
