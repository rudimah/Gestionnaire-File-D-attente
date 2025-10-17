import { Component, inject, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Ticket } from '../../models/table';
import { SocketService } from '../../services/socket-service.service';
import { DisplayTicketComponent } from '../../componenet/display-ticket/display-ticket.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ecran',
  imports: [DisplayTicketComponent, CommonModule],
  templateUrl: './ecran.component.html',
  styleUrl: './ecran.component.css'
})
export class EcranComponent implements OnInit {
  private socketSubscription!: Subscription;
  private readonly socketService = inject(SocketService);
  private readonly apiService = inject(ApiService)
  tickets: Ticket[] = [];
  ticket : Ticket = { client: 0, box: '' };
  show : boolean = false;

  lstTicketCall(){
    this.apiService.getTicket().subscribe({
      next: (data) => {
        this.tickets = data;
      }});
  }
  ngOnInit(): void {
    this.lstTicketCall();
    this.socketSubscription = this.socketService.listenToClientUpdate().subscribe(ticket => {
      this.ticket = ticket
      if(ticket &&
        ticket.client &&
        ticket.box){
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 5000);
         if (!this.tickets.some(t => t.client === ticket.client && t.box === ticket.box)) {
          this.lstTicketCall();
        }
      }
      
     
    });
  }

}

