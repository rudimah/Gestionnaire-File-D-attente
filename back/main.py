from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

from controllers.agents_controller import agents_controller
from controllers.clients_controller import clients_controller
from controllers.ecran_controller import ecran_controller
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


app.register_blueprint(agents_controller)
app.register_blueprint(clients_controller)
app.register_blueprint(ecran_controller)

app.socketio = socketio

if __name__ == "__main__" :
    socketio.run(app, debug=True, host="0.0.0.0", port=8000)