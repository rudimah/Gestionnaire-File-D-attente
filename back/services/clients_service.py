import models.database as bd
import datetime

def get_client_by_id(id_client):
    connection  = bd.get_connection()
    cursor = connection.cursor()
    query = """ SELECT id_client, client.nom, client.sujet, agent.nom as agent_souhaite,  client.prix, client.moyen_de_paiment
                FROM client  join agent on id_agent = agent_souhaite
                where id_client = %s  """
    try:
        cursor.execute(query, (id_client,))
        return cursor.fetchone()
    finally:
        cursor.close()
        connection.close()
    pass

def ajout_client(data: dict):
    if data['idClient']:
        #UPDATE
        del data["idClient"]
        del data["agent_souhaite"]
        set_clause = ", ".join([f"{key} = %s" for key in data ])
        query = f"UPDATE client SET {set_clause} WHERE id_client = %s"
        params = tuple(data[key] for key in data ) + (data["idClient"],)
    else:
        # INSERT
        del data["idClient"]
        columns = ", ".join(data.keys() ) + ", heure_arrive"
        values = ", ".join(["%s"] * (len(data) + 1))
        query = f"INSERT INTO client ({columns}) VALUES ({values})"
        params = tuple(data.values()) + (datetime.datetime.now(),)
        print("insert")
        print(columns)
        print(values)
        

    connection = bd.get_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(query, params)
        connection.commit()
        print('commit')
        return True
    except Exception as e:
        connection.rollback()
        return str(e)
    finally:
        cursor.close()
        connection.close()


def get_en_attente() -> list:

    connection = bd.get_connection()
    cursor = connection.cursor()
    try:
        query = """
        SELECT client.id_client, client.nom, client.sujet, client.heure_arrive, agent.nom, 
               client.prix, client.moyen_de_paiment, client.etat 
        FROM client 
        JOIN agent ON client.agent_souhaite = agent.id_agent 
        ORDER BY client.heure_arrive DESC
        """
        cursor.execute(query)
        return cursor.fetchall()
    finally:
        cursor.close()
        connection.close()
