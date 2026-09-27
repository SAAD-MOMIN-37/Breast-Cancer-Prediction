import { CancerPrediction } from '../api/cancer'

interface ResultsCardProps {
  prediction: CancerPrediction
}

export default function ResultsCard({ prediction }: ResultsCardProps) {
  const isMalignant = prediction.diagnosis === 'Malignant'

  return (
    <div className="results-card">
      <h2>Prediction Result</h2>
      <div className={`diagnosis-badge ${isMalignant ? 'malignant' : 'benign'}`}>
        {prediction.diagnosis}
      </div>
      <div className="confidence-bar">
        <span>Confidence</span>
        <div className="confidence-value">{Math.round(prediction.confidence * 100)}%</div>
      </div>
      <div className="probability-bars">
        <div className="prob-bar">
          <span>Benign</span>
          <div className="prob-track">
            <div
              className="prob-fill benign-track"
              style={{ width: `${prediction.prob_benign * 100}%` }}
            />
          </div>
          <span>{Math.round(prediction.prob_benign * 100)}%</span>
        </div>
        <div className="prob-bar">
          <span>Malignant</span>
          <div className="prob-track">
            <div
              className="prob-fill malignant-track"
              style={{ width: `${prediction.prob_malignant * 100}%` }}
            />
          </div>
          <span>{Math.round(prediction.prob_malignant * 100)}%</span>
        </div>
      </div>
    </div>
  )
}
