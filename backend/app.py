# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "API solar backend running"

@app.route("/calcular", methods=["POST"])
def calcular_ahorro():
    data = request.get_json()
    
    consumo_mensual = float(data.get("consumo", 0))  # en kWh
    tarifa = float(data.get("tarifa", 0))            # en €/kWh
    produccion_solar = float(data.get("produccion", 0))  # en kWh

    ahorro = min(produccion_solar, consumo_mensual) * tarifa

    return jsonify({
        "ahorro_mensual": round(ahorro, 2),
        "mensaje": f"Estimated monthly savings: €{round(ahorro, 2)}"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)