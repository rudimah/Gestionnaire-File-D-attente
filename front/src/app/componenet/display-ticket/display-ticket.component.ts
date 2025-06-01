import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { Ticket } from '../../models/table';

@Component({
  selector: 'app-display-ticket',
  imports: [],
  templateUrl: './display-ticket.component.html',
  styleUrl: './display-ticket.component.css'
})
export class DisplayTicketComponent implements OnInit{
  @Input ({required: true}) ticket!: Ticket ;
  @Output() close_affichage = new EventEmitter();
  affichage = true;

  ngOnInit(): void {
    this.playSound();
  }

  playSound() {
    const audio = new Audio();
    audio.src = 'sons/ticket.mp3';
    audio.load();
    audio.play();
  }
  closeTicket(){
    this.close_affichage.emit();
  }
}
