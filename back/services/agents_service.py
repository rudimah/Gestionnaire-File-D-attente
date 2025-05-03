import mysql.connector
import datetime
import time

connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="aisa_pro"
)
cursor = connection.cursor()

def get_nom_agents() :
    cursor.execute(f'select nom from agent where id_agent in (select agent from bureau)')
    res = cursor.fetchall()
    return [elem[0] for elem in res]

def gen_ticket(nom):
    cursor.execute(f"select id_bureau from bureau where agent = (select id_agent from agent where nom = %s)", (nom,))
    initiale = cursor.fetchone()[0]
    cursor.execute(f"SELECT num_ticket FROM client ORDER BY num_ticket DESC LIMIT 1")
    row = cursor.fetchone()
    num = row[0] + 1 if row else 1
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    cursor.execute(f"INSERT INTO client (num_ticket, heure_arrive, agent_souhaite) VALUES (%s, %s, (SELECT id_agent FROM agent WHERE nom = %s))", (num, now, nom))
    connection.commit()

    return initiale + str(num)
