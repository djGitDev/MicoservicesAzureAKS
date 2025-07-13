from flask import Flask, jsonify
import psycopg2
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 🔧 Lire les variables d'environnement ou utiliser des valeurs par défaut
DB_NAME = os.environ.get("PGDATABASE", "postgres")
DB_USER = os.environ.get("PGUSER", "postgres")
DB_PASS = os.environ.get("PGPASSWORD", "pass")
DB_HOST = os.environ.get("PGHOST", "localhost")
DB_PORT = os.environ.get("PGPORT", "5433")  # 5433 pour le port local si tu veux éviter conflit

# 🔗 Connexion à PostgreSQL
def get_connection():
    return psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        host=DB_HOST,
        port=DB_PORT
    )

@app.route('/python-service/health')
def health_check():
    """Endpoint de santé minimaliste pour Kubernetes"""
    return jsonify({
        "status": "healthy",
        "message": "Service opérationnel"
    }), 200


@app.route('/python-service/api/status')
def status():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT NOW()")
        result = cur.fetchone()
        now = result[0]
        cur.close()
        conn.close()

        return jsonify({
            "message": "✅ Connexion PostgreSQL depuis Python OK",
            "now": now.isoformat()
        })

    except Exception as e:
        return jsonify({
            "error": "❌ Connexion PostgreSQL échouée",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7001)