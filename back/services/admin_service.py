import models.database as bd
def ajout_agent(data: dict):
    query = """INSERT INTO agent (nom) VALUES (%s)
            """
    connection = bd.get_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(query, (data["nomAgent"], ))
        connection.commit()
        return True
    except Exception as e:
        connection.rollback()
        print(str(e))
        return str(e)
    finally:
        cursor.close()
        connection.close()

def list_bureau_dispo():
    connection = bd.get_connection()
    cursor = connection.cursor()
    query = """select id_bureau from bureau where agent is null"""
    try:
        cursor.execute(query)
        return cursor.fetchall()
    except Exception as e:
        print(str(e))
        return str(e)
    finally:
        cursor.close()
        connection.close()

def modif_agent(data):
    if data["bureau"] == "":
        data["bureau"] = "null"
        
    query = """update agent set nom = %s where id_agent = %s;
               update bureau set agent = %s where id_bureau = %s;
            """
    connection = bd.get_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(query, (data["nomAgent"], data["idAgent"], data["idAgent"], data["bureau"]))
        connection.commit()
        return True
    except Exception as e:
        connection.rollback()
        print(str(e))
        return str(e)
    finally:
        cursor.close()
        connection.close()

def supprimer_agent(idAgent : int):
    query = """DELETE from agent where id_agent = %s;
            """
    connection = bd.get_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(query, (idAgent,))
        connection.commit()
        return True
    except Exception as e:
        connection.rollback()
        print(str(e))
        return str(e)
    finally:
        cursor.close()
        connection.close()