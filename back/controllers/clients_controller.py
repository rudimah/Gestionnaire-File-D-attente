from flask import Blueprint, jsonify, request, Response
import services.clients_service as client_service

clients_controller = Blueprint("clients", __name__, url_prefix='/clients')

@clients_controller.route('<int:id_client>', methods=["GET"])
def client_by_id(id_client)-> tuple[Response, int]:
    data = client_service.get_client_by_id(id_client)
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur"}), 404
    pass

@clients_controller.route('/add', methods=["POST"])
def ajout_client()-> tuple[Response, int]:
    data = request.get_json()
    if not data :
        return jsonify({"erreur" : "Données invalides"}), 400 
    client_service.ajout_client(data)
    return jsonify({"Message" : "Doonnées inerer avec validation"}), 200

@clients_controller.route('/list', methods=["GET"])
def en_attente()-> tuple[Response, int]:
    data = client_service.get_en_attente()
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur"}), 404
    