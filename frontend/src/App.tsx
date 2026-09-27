import { useState } from 'react'
import FeatureForm from './components/FeatureForm'
import ResultsCard from './components/ResultsCard'
import { CancerPrediction } from './api/cancer'
import './App.css'

function App() {
  const [result, setResult] = useState<CancerPrediction | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Breast Cancer Prediction</h1>
        <p>Enter tumor features to predict diagnosis (Benign / Malignant)</p>
      </header>

      <main className="app-main">
        <FeatureForm
          onPredict={setResult}
          loading={loading}
          setLoading={setLoading}
          setError={setError}
        />

        {error && <div className="error-box">{error}</div>}

        {result && <ResultsCard prediction={result} />}
      </main>

      <footer className="app-footer">
        <p>Educational use only. Consult a medical professional for diagnosis.</p>
      </footer>
    </div>
  )
}

export default App
