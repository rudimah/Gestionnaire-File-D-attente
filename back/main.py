from flask import Flask
from flask_cors import CORS
from controllers.agents_controller import agent_controller

app = Flask(__name__)
CORS(app)

app.register_blueprint(agent_controller)

if __name__ == "__main__" :
    app.run(debug=True)