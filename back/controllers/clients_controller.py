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

@clients_controller.route('<int:id_client>', methods=["DELETE"])
def supprimer_client(id_client)-> tuple[Response, int]:
    data = client_service.supprimer_client(id_client)
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur "}), 404

@clients_controller.route('/add', methods=["POST"])
def ajout_client()-> tuple[Response, int]:
    data = request.get_json()
    if not data :
        return jsonify({"erreur" : "Données invalides"}), 400 
    id = client_service.ajout_client(data)
    return jsonify({"data" : id}), 200

@clients_controller.route('/list', methods=["GET"])
def en_attente()-> tuple[Response, int]:
    data = client_service.get_en_attente()
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur"}), 404
    