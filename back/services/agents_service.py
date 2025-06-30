import models.database as bd
import datetime
def get_nom_agents() :
    connection = bd.get_connection()
    cursor =  connection.cursor()
    try:
        cursor.execute(f'select * from agent where id_agent in (select agent from bureau)')
        res =  cursor.fetchall()
    
    finally:
        cursor.close()
        connection.close()
        return res
def get_agents():
    connection = bd.get_connection()
    cursor =  connection.cursor()
    try:
        cursor.execute(f'select * from agent')
        res =  cursor.fetchall()
    finally:
        cursor.close()
        connection.close()
        return res

def get_client(id_agent):
    connection  = bd.get_connection()
    cursor = connection.cursor()
    try:
        update_query = """update bureau set client = (select id_client 
                                    FROM client 
                                    where agent_souhaite = %s and etat = false
                                    ORDER BY client.heure_arrive  LIMIT 1)
                    where agent = %s ;"""

        cursor.execute(update_query, (id_agent, id_agent))
        connection.commit()
        query  = """
            SELECT id_client, client.nom, client.sujet, client.agent_souhaite,  client.prix, client.moyen_de_paiment
            FROM client  
            where agent_souhaite = %s and etat = false
            ORDER BY client.heure_arrive  LIMIT 1;
            """
        cursor.execute(query, (id_agent, ))

        return cursor.fetchone()
    except Exception as e:
        print("Erreur"+ str(e))
        connection.rollback()
        return str(e)
    finally:
        cursor.close()
        connection.close()

def terminer_client_actuelle(id_agent):
    connection  = bd.get_connection()
    cursor = connection.cursor()
    query = """UPDATE client SET etat = true 
            WHERE id_client = (SELECT client 
                            from bureau 
                            where agent = %s)"""
    try:
        cursor.execute(query, (id_agent,))
        connection.commit()
        return True
    except Exception as e:
        connection.rollback()
        return str(e)
    finally:
        cursor.close()
        connection.close()

def client_actuelle(id_agent):
    connection  = bd.get_connection()
    cursor = connection.cursor()
    query = """select id_bureau, client
                from bureau 
                where agent = %s """
    try:
        cursor.execute(query, (id_agent,))
        return cursor.fetchone()
    finally:
        cursor.close()
        connection.close()

def appeler_client(id_agent):
    connection  = bd.get_connection()
    cursor = connection.cursor()
    query_verif = """select client from ecran where client = (select client
                from bureau 
                where agent = %s)  
                """
    query_insert = """INSERT INTO ecran (bureau, client, heure_appelle) 
                select id_bureau, client, %s
                from bureau 
                where agent = %s"""
    query_update = """update ecran set heure_appelle = %s where client  = (select client from bureau where agent = %s)"""
    try:
        cursor.execute(query_verif, (id_agent, ))
        if cursor.fetchone():
            print("up^date")
            cursor.execute(query_update, (datetime.datetime.now(), id_agent, ))
        else:
            cursor.execute(query_insert, (datetime.datetime.now(), id_agent, ))
        connection.commit()
        
        return True
    except Exception as e:
        connection.rollback()
        print(str(e))
        return str(e)
    finally:
        cursor.close()
        connection.close()   

