from flask import Blueprint, jsonify, request, Response
import services.admin_service as admin_service

admin_controller = Blueprint("admin", __name__, url_prefix='/admin')

@admin_controller.route('/addAgent', methods=["POST"])
def ajout_agent()-> tuple[Response, int]:
    data = request.get_json()
    if not data :
        return jsonify({"erreur" : "Données invalides"}), 400
    if admin_service.ajout_agent(data): 
        print("insert")
        return jsonify({"Message" : "Doonnées inerer avec validation"}), 200
    
@admin_controller.route('/modifAgent', methods=["POST"])
def modif_agent()-> tuple[Response, int]:
    data = request.get_json()
    if not data :
        return jsonify({"erreur" : "Données invalides"}), 400
    if admin_service.modif_agent(data): 
        return jsonify({"Message" : "Doonnées inerer avec validation"}), 200
    
@admin_controller.route('/<int:id_Agent>', methods=["DELETE"])
def supprimer_agent(id_Agent: int)-> tuple[Response, int]:
    data = admin_service.supprimer_agent(id_Agent)
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur "}), 404
    
@admin_controller.route('/bureau', methods=["GET"])
def get_bureau_dispo():
    data = admin_service.list_bureau_dispo()
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur"}), 404