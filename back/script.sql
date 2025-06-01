DROP TABLE `agent`, `bureau`, `client`;

CREATE TABLE agent (
    id_agent INT AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    constraint PRIMARY KEY (id_agent)
) ENGINE=InnoDB;

CREATE TABLE client (
    id_client INT AUTO_INCREMENT,
    nom VARCHAR(20) NOT NULL,
    sujet VARCHAR(50),
    heure_arrive TIMESTAMP NULL DEFAULT NULL,
    agent_souhaite INT NOT NULL,
    prix VARCHAR(5) null,
    moyen_de_paiment VARCHAR(20),
    etat BOOLEAN DEFAULT FALSE,
    constraint PRIMARY KEY (id_client),
    constraint FOREIGN KEY (agent_souhaite) REFERENCES agent(id_agent)
) ENGINE=InnoDB;

CREATE TABLE bureau (
    id_bureau VARCHAR(1) PRIMARY KEY,
    client INT,
    agent INT NOT NULL,
    constraint FOREIGN KEY (agent) REFERENCES agent(id_agent),
    constraint FOREIGN KEY (client) REFERENCES client(id_client)
) ENGINE=InnoDB;

CREATE TABLE ecran(
    bureau VARCHAR(1),
    client int,
    heure_appelle TIMESTAMP,
    constraint PRIMARY KEY (bureau, client),
    constraint FOREIGN KEY (bureau) REFERENCES bureau(id_bureau),
    constraint FOREIGN KEY (client) REFERENCES client(id_client)
)ENGINE=InnoDB;

INSERT INTO agent (nom)VALUES 
    ("Sunny"),
    ("Rio B"),
    ("Hasan"),
    ("Hamzuz");

INSERT INTO bureau (id_bureau, client, agent) VALUES
    ("A", null, 1),
    ("B", null, 2),
    ("C", null, 4);
