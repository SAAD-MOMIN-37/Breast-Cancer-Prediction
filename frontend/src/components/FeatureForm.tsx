import { useState } from 'react'
import { predictCancer, CancerFeatures, CancerPrediction } from '../api/cancer'

const featureGroups: { label: string; keys: (keyof CancerFeatures)[] }[] = [
  {
    label: 'Mean Features',
    keys: [
      'radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean',
      'smoothness_mean', 'compactness_mean', 'concavity_mean',
      'concave_points_mean', 'symmetry_mean', 'fractal_dimension_mean',
    ],
  },
  {
    label: 'Standard Error (SE) Features',
    keys: [
      'radius_se', 'texture_se', 'perimeter_se', 'area_se',
      'smoothness_se', 'compactness_se', 'concavity_se',
      'concave_points_se', 'symmetry_se', 'fractal_dimension_se',
    ],
  },
  {
    label: 'Worst Features',
    keys: [
      'radius_worst', 'texture_worst', 'perimeter_worst', 'area_worst',
      'smoothness_worst', 'compactness_worst', 'concavity_worst',
      'concave_points_worst', 'symmetry_worst', 'fractal_dimension_worst',
    ],
  },
]

interface FeatureFormProps {
  onPredict: (result: CancerPrediction) => void
  loading: boolean
  setLoading: (v: boolean) => void
  setError: (v: string | null) => void
}

export default function FeatureForm({ onPredict, loading, setLoading, setError }: FeatureFormProps) {
  const [features, setFeatures] = useState<Partial<CancerFeatures>>({})

  const handleChange = (key: keyof CancerFeatures, value: string) => {
    setFeatures((prev) => ({ ...prev, [key]: value === '' ? undefined : parseFloat(value) }))
  }

  const handlePredict = async () => {
    const missing = featureGroups
      .flatMap((g) => g.keys)
      .filter((k) => features[k] === undefined || features[k] === null)

    if (missing.length > 0) {
      setError(`Missing values: ${missing.join(', ')}`)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await predictCancer(features as CancerFeatures)
      onPredict(response.data)
    } catch (err: any) {
      setError(err?.response?.data?.detail || err.message || 'Prediction failed')
    } finally {
      setLoading(false)
    }
  }

  const fillDefaults = () => {
    const defaults: CancerFeatures = {
      radius_mean: 17.99, texture_mean: 10.38, perimeter_mean: 122.8, area_mean: 1001.0,
      smoothness_mean: 0.1184, compactness_mean: 0.2776, concavity_mean: 0.3001,
      concave_points_mean: 0.1471, symmetry_mean: 0.2419, fractal_dimension_mean: 0.07871,
      radius_se: 1.095, texture_se: 0.9053, perimeter_se: 8.589, area_se: 153.4,
      smoothness_se: 0.006399, compactness_se: 0.04904, concavity_se: 0.05373,
      concave_points_se: 0.01587, symmetry_se: 0.03003, fractal_dimension_se: 0.006193,
      radius_worst: 25.38, texture_worst: 17.33, perimeter_worst: 184.6, area_worst: 2019.0,
      smoothness_worst: 0.1622, compactness_worst: 0.6656, concavity_worst: 0.7119,
      concave_points_worst: 0.2654, symmetry_worst: 0.4601, fractal_dimension_worst: 0.1189,
    }
    setFeatures(defaults)
    setError(null)
  }

  return (
    <div className="feature-form">
      <div className="form-header">
        <h2>Tumor Features</h2>
        <button type="button" className="btn-secondary" onClick={fillDefaults}>
          Fill Sample Values
        </button>
      </div>

      {featureGroups.map((group) => (
        <div key={group.label} className="feature-group">
          <h3>{group.label}</h3>
          <div className="feature-grid">
            {group.keys.map((key) => (
              <div key={key} className="feature-input">
                <label htmlFor={key}>{key.replace('_', ' ')}</label>
                <input
                  id={key}
                  type="number"
                  step="any"
                  value={features[key] ?? ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  disabled={loading}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        className="btn-primary"
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? 'Predicting...' : 'Predict Diagnosis'}
      </button>
    </div>
  )
}
