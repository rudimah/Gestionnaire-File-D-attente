CREATE TABLE agent (
    id_agent INT AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    constraint PRIMARY KEY (id_agent)
) ENGINE=InnoDB;

CREATE TABLE bureau (
    id_bureau VARCHAR(1) PRIMARY KEY,
    num_ticket INT,
    agent INT NOT NULL,
    constraint  FOREIGN KEY (agent) REFERENCES agent(id_agent)
) ENGINE=InnoDB;


CREATE TABLE client (
    num_ticket INT NOT NULL,
    heure_arrive TIMESTAMP,
    agent_souhaite INT NOT NULL,
    constraint PRIMARY KEY (num_ticket, agent_souhaite),
    constraint FOREIGN KEY (agent_souhaite) REFERENCES agent(id_agent)
) ENGINE=InnoDB;



INSERT INTO agent (nom)VALUES 
    ("Sunny"),
    ("Rio B"),
    ("Hasan"),
    ("Hamzuz");

INSERT INTO bureau (id_bureau, num_ticket, agent) VALUES
    ("A", null, 1),
    ("B", null, 2),
    ("C", null, 4);

INSERT INTO client (num_ticket, heure_arrive, agent_souhaite) VALUES 
(1, '2025-05-02 16:46:37', 1),
(2, '2025-05-02 16:45:37', 4);

