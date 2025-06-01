export interface Client{
  id: number;
  nom: string;
  sujet: string;
  agent : number;
  prix : number;
  mdp : string
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
  idClient: number;
  nom: string;
  sujet: string;
  heure: string;
  agent: string;
  prix: string,
  mdp: string,
  etat: number;
}
