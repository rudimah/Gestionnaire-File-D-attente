from flask import Blueprint, jsonify, request, Response
import services.ecran_service as ecran_service

ecran_controller = Blueprint("ecran", __name__, url_prefix='/ecran')

@ecran_controller.route('', methods=["GET"])
def get_ticket()-> tuple[Response, int]:
    data = ecran_service.client_appeller()
    if data:
        return jsonify({"data": data}), 200
    else:
        return jsonify({"erreur" : "Erreur"}), 404