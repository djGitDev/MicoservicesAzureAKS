import React, { useState } from 'react';

function App() {
  const [nodeResponse, setNodeResponse] = useState(null);
  const [pythonResponse, setPythonResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNodeClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('node-service/api/hello');
      const data = await res.json();
      setNodeResponse(data);
    } catch (err) {
      setNodeResponse({ error: 'Erreur lors de la connexion au backend Node.js' });
    }
    setLoading(false);
  };

  const handlePythonClick = async () => {
    setLoading(true);
    try {
      const health = await fetch('python-service/health');
    console.log("Health raw text:", await health.text());

    const res = await fetch('python-service/api/status');
    // Soit lire la réponse directement en JSON
    const data = await res.json(); 
    console.log("Réponse Python API:", data);
    setPythonResponse(data);
    } catch (err) {
      setPythonResponse({ error: 'Erreur lors de la connexion au backend Python' });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Test de connexion aux bases PostgreSQL</h1>

      <button onClick={handleNodeClick} style={{ marginRight: '1rem' }}>
        Vérifier Node.js (5432)
      </button>

      <button onClick={handlePythonClick}>
        Vérifier Python (5433)
      </button>

      {loading && <p>Chargement...</p>}

      {nodeResponse && (
        <div style={{ marginTop: '1rem' }}>
          <h3>🟦 Réponse Node.js :</h3>
          {nodeResponse.error ? (
            <p style={{ color: 'red' }}>{nodeResponse.error}</p>
          ) : (
            <>
              <p>{nodeResponse.message}</p>
              <p>Heure serveur : {nodeResponse.time}</p>
            </>
          )}
        </div>
      )}

      {pythonResponse && (
        <div style={{ marginTop: '1rem' }}>
          <h3>🐍 Réponse Python :</h3>
          {pythonResponse.error ? (
            <p style={{ color: 'red' }}>{pythonResponse.error}</p>
          ) : (
            <>
              <p>{pythonResponse.message}</p>
              <p>Heure serveur : {pythonResponse.now}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;