import mysql.connector

connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="aisa_pro"
)
cursor = connection.cursor()

def get_nom_agents() :
    cursor.execute(f'select nom from agent')
    res = cursor.fetchall()
    return [elem[0] for elem in res]