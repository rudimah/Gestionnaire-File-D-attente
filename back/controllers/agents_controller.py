from flask import Blueprint, jsonify, request, Response
import services.agents_service as agent_service

agent_controller = Blueprint("agents", __name__, url_prefix='/agents')

@agent_controller.route('', methods=["GET"])
def lst_agent() -> tuple[Response, int]:
    data = agent_service.get_nom_agents()
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur"}), 404

@agent_controller.route('/gen/<string:nom_agent>', methods=["POST", "GET"])
def gen_ticket(nom_agent:str)-> tuple[Response, int]:
    data = agent_service.gen_ticket(nom_agent)
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur"}), 404
