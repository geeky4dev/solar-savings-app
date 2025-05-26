import { useState } from 'react'

function App() {
  const [consumo, setConsumo] = useState("")
  const [tarifa, setTarifa] = useState("")
  const [produccion, setProduccion] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")

  // Usar la variable de entorno correctamente
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001"

  const validarCampos = () => {
    if (!consumo || consumo <= 0) return "Electricity consumption must be greater than 0."
    if (!tarifa || tarifa <= 0) return "Electricity price must be greater than 0."
    if (!produccion || produccion <= 0) return "Solar energy production must be greater than 0."
    return ""
  }

  const calcularAhorro = async () => {
    const errorValidacion = validarCampos()
    if (errorValidacion) {
      setError(errorValidacion)
      setMensaje("")
      return
    }

    try {
      const res = await fetch(`${backendUrl}/calcular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consumo, tarifa, produccion })
      })

      if (!res.ok) {
        throw new Error(`Error from server: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()
      setMensaje(data.mensaje || "Calculation successful")
      setError("")
    } catch (err) {
      setError(`Failed to connect to backend: ${err.message}`)
      setMensaje("")
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Solar Savings Calculator</h1>

      <div className="mb-3">
        <label className="form-label">Monthly consumption (kWh)</label>
        <input
          type="number"
          className="form-control"
          value={consumo}
          onChange={(e) => setConsumo(e.target.value)}
          min="0"
          placeholder="e.g: 300"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Electricity price (€/kWh)</label>
        <input
          type="number"
          className="form-control"
          value={tarifa}
          onChange={(e) => setTarifa(e.target.value)}
          min="0"
          step="0.01"
          placeholder="e.g: 0.15"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Estimated solar production (kWh)</label>
        <input
          type="number"
          className="form-control"
          value={produccion}
          onChange={(e) => setProduccion(e.target.value)}
          min="0"
          placeholder="e.g: 250"
        />
      </div>

      <button className="btn btn-primary" onClick={calcularAhorro}>
        Calculate savings
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
    </div>
  )
}

export default App


