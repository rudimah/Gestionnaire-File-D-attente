import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Agent } from '../../models/table';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  imports: [AsyncPipe],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{
  
  private readonly apiService = inject(ApiService);
  listAgents = new BehaviorSubject<Agent[]>([]);

  ngOnInit(): void {
    this.apiService.getAgents().pipe(
      map(response => response.data)
    ).subscribe(
        data => this.listAgents.next(data)
      );
  }

}
