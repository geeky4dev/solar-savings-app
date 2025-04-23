import { useState } from 'react'

function App() {
  const [mensaje, setMensaje] = useState("")
  const [respuesta, setRespuesta] = useState("")

  const enviarMensaje = async () => {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensaje })
    })
    const data = await res.json()
    setRespuesta(data.respuesta)
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Chatbot FAQ</h1>
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe tu pregunta"
      />
      <button onClick={enviarMensaje}>Enviar</button>
      <p><strong>Respuesta:</strong> {respuesta}</p>
    </div>
  )
}

export default App

