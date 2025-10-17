import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private clientSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    // Connexion au serveur WebSocket
    this.socket = io('http://localhost:8000');
  }

  // Méthode pour écouter les mises à jour en temps réel pour un agent spécifique
  listenToClientUpdate(): Observable<any> {
    this.socket.on(`apelle_client`, (data) => {
      console.log(data)
      this.clientSubject.next(data); // Mettre à jour le client dans le BehaviorSubject
    });

    return this.clientSubject.asObservable();
  }


}