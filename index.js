const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const N8N_WEBHOOK_URL = "https://ranx8n.app.n8n.cloud/webhook-test/atenea/entrada";

app.use(express.json());

app.post('/atenea/puente', async (req, res) => {
  try {
    const payload = req.body;
    const response = await axios.post(N8N_WEBHOOK_URL, payload);
    res.status(200).send({
      message: '✅ Datos enviados correctamente a n8n',
      recibido: payload,
      respuesta_n8n: response.data
    });
  } catch (error) {
    console.error("❌ Error al reenviar:", error.message);
    res.status(500).send({ error: 'Error al reenviar los datos a n8n' });
  }
});

app.listen(PORT, () => {
  console.log(`🌀 Puente simbiótico activo en puerto ${PORT}`);
});
