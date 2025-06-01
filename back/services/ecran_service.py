import models.database as bd

def client_appeller():
    connection  = bd.get_connection()
    cursor = connection.cursor()
    query = """select bureau, client
                from ecran 
                order by(heure_appelle) desc limit 8"""
    try:
        cursor.execute(query)
        return cursor.fetchall()
    finally:
        cursor.close()
        connection.close()