CREATE TABLE agent (
    id_agent INT AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    constraint PRIMARY KEY (id_agent)
) ENGINE=InnoDB;

CREATE TABLE client (
    num_ticket INT NOT NULL,
    heure_arrive TIMESTAMP,
    agent_souhaite INT NOT NULL,
    constraint PRIMARY KEY (num_ticket, agent_souhaite),
    constraint FOREIGN KEY (agent_souhaite) REFERENCES agent(id_agent)
) ENGINE=InnoDB;

CREATE TABLE box (
    id_box INT AUTO_INCREMENT PRIMARY KEY,
    num_ticket INT NOT NULL,
    agent INT NOT NULL,
    constraint FOREIGN KEY (num_ticket, agent) REFERENCES client(num_ticket, agent_souhaite),
    constraint  FOREIGN KEY (agent) REFERENCES agent(id_agent)
) ENGINE=InnoDB;


INSERT INTO agent values 
    (1, "Sunny"),
    (2, "Rio B"),
    (3, "Hasan"),
    (4, "Hamzuz");