import { useState } from 'react'
import FeatureForm from './components/FeatureForm'
import ResultsCard from './components/ResultsCard'
import { CancerPrediction } from './api/cancer'
import './App.css'

function App() {
  const [result, setResult] = useState<CancerPrediction | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleResult = (prediction: CancerPrediction) => {
    setResult(prediction)
    setError(null)
  }

  return (
    <div className="app-shell">
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      <header className="hero">
        <div className="hero-badge">
          <span className="status-dot" />
          AI DIAGNOSTIC SYSTEM
        </div>

        <h1>
          Breast Cancer
          <span> Prediction</span>
        </h1>

        <p>
          Machine-learning powered breast tumor classification
          using an ensemble prediction pipeline.
        </p>
      </header>

      <main className="dashboard">
        <section className="workspace-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MODEL INPUT</span>
              <h2>Tumor Characteristics</h2>
              <p>
                Enter the 30 diagnostic features used by the trained model.
              </p>
            </div>

            <div className="feature-count">
              <strong>30</strong>
              <span>features</span>
            </div>
          </div>

          <FeatureForm
            onPredict={handleResult}
            loading={loading}
            setLoading={setLoading}
            setError={setError}
          />

          {error && (
            <div className="error-box">
              <span className="error-icon">!</span>
              <div>
                <strong>Prediction Error</strong>
                <p>{error}</p>
              </div>
            </div>
          )}
        </section>

        <aside className="results-panel">
          {result ? (
            <ResultsCard prediction={result} />
          ) : (
            <div className="empty-result">
              <div className="empty-icon">✦</div>

              <span className="eyebrow">PREDICTION OUTPUT</span>

              <h2>Awaiting Analysis</h2>

              <p>
                Submit the tumor characteristics to generate
                the model prediction and probability distribution.
              </p>

              <div className="empty-line">
                <span />
                Ready for inference
              </div>
            </div>
          )}
        </aside>
      </main>

      <footer className="app-footer">
        <div>
          <strong>AI • MACHINE LEARNING • HEALTHCARE</strong>
          <span>Educational prototype</span>
        </div>

        <p>
          This system is for educational and experimental purposes only.
          It is not a medical diagnostic tool.
        </p>
      </footer>
    </div>
  )
}

export default App