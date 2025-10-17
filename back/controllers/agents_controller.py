from flask import Blueprint, jsonify, current_app, Response
import services.agents_service as agent_service

agents_controller = Blueprint("agents", __name__, url_prefix='/agents')

@agents_controller.route('', methods=["GET"])
def lst_agent() -> tuple[Response, int]:
    data = agent_service.get_nom_agents()
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur"}), 404

@agents_controller.route('<int:id_agent>/client', methods=["GET"])
def get_client(id_agent) -> tuple[Response, int]:
    data = agent_service.get_client(id_agent)
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur"}), 404

@agents_controller.route('<int:id_agent>/next', methods=["GET"])
def get_nv_client(id_agent:str) -> tuple[Response, int]:
    if agent_service.terminer_client_actuelle(id_agent):
        data = agent_service.get_client(id_agent)
        if data:
            call_client_actuelle(id_agent)
            return jsonify({"data": data}), 200
        else:
            return jsonify({"erreur": "Aucun client trouvé"}), 404
    else:
        return jsonify({"erreur" : "Erreur"}), 404
    
@agents_controller.route('<int:id_agent>/call', methods=["GET"])
def call_client_actuelle(id_agent:str):
    data = agent_service.client_actuelle(id_agent)
    if data:
        socketio = current_app.socketio
        socketio.emit(f"apelle_client", {
            "box": data[0],
            "client": data[1]
        })
        agent_service.appeler_client(id_agent)
        return jsonify({"message": "Apelle reussis"}), 200
    else:
        return jsonify({"erreur" : "Erreur"}), 404