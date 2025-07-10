# Image de base officielle Python
FROM python:3.11-slim

# Définir le dossier de travail
WORKDIR /app

RUN pip install flask flask-cors psycopg2-binary

# Copier le reste du code
COPY . .

# Exposer le port utilisé par Flask
EXPOSE 7001

# Lancer l'application
CMD ["python", "app.py"]