export interface Client{
  id: number;
  nom: string;
  sujet: string;
  agent : string;
  prix : number;
  mdp : string;
}

export interface Agent{
  id: number;
  nom: string;
  bureau : string;
}

export interface Ticket{
  client: number;
  box: string;
}

export interface TableAgent{
    id: number;
    nom : string;
}

export interface ClientEnAttente {
  id_client: number;
  nom: string;
  sujet: string;
  heure: string;
  agent: string;
  prix: string,
  mdp: string,
  etat: number;
}
