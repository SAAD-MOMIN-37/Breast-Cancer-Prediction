import { useState } from 'react'
import {
  predictCancer,
  CancerFeatures,
  CancerPrediction,
} from '../api/cancer'

const featureGroups: {
  label: string
  description: string
  keys: (keyof CancerFeatures)[]
}[] = [
  {
    label: 'Mean Features',
    description: 'Average tumor measurements',
    keys: [
      'radius_mean',
      'texture_mean',
      'perimeter_mean',
      'area_mean',
      'smoothness_mean',
      'compactness_mean',
      'concavity_mean',
      'concave_points_mean',
      'symmetry_mean',
      'fractal_dimension_mean',
    ],
  },
  {
    label: 'Standard Error',
    description: 'Measurement uncertainty indicators',
    keys: [
      'radius_se',
      'texture_se',
      'perimeter_se',
      'area_se',
      'smoothness_se',
      'compactness_se',
      'concavity_se',
      'concave_points_se',
      'symmetry_se',
      'fractal_dimension_se',
    ],
  },
  {
    label: 'Worst Features',
    description: 'Largest observed tumor measurements',
    keys: [
      'radius_worst',
      'texture_worst',
      'perimeter_worst',
      'area_worst',
      'smoothness_worst',
      'compactness_worst',
      'concavity_worst',
      'concave_points_worst',
      'symmetry_worst',
      'fractal_dimension_worst',
    ],
  },
]

interface FeatureFormProps {
  onPredict: (result: CancerPrediction) => void
  loading: boolean
  setLoading: (value: boolean) => void
  setError: (value: string | null) => void
}

const sampleValues: CancerFeatures = {
  radius_mean: 17.99,
  texture_mean: 10.38,
  perimeter_mean: 122.8,
  area_mean: 1001.0,
  smoothness_mean: 0.1184,
  compactness_mean: 0.2776,
  concavity_mean: 0.3001,
  concave_points_mean: 0.1471,
  symmetry_mean: 0.2419,
  fractal_dimension_mean: 0.07871,

  radius_se: 1.095,
  texture_se: 0.9053,
  perimeter_se: 8.589,
  area_se: 153.4,
  smoothness_se: 0.006399,
  compactness_se: 0.04904,
  concavity_se: 0.05373,
  concave_points_se: 0.01587,
  symmetry_se: 0.03003,
  fractal_dimension_se: 0.006193,

  radius_worst: 25.38,
  texture_worst: 17.33,
  perimeter_worst: 184.6,
  area_worst: 2019.0,
  smoothness_worst: 0.1622,
  compactness_worst: 0.6656,
  concavity_worst: 0.7119,
  concave_points_worst: 0.2654,
  symmetry_worst: 0.4601,
  fractal_dimension_worst: 0.1189,
}

function formatLabel(key: string) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export default function FeatureForm({
  onPredict,
  loading,
  setLoading,
  setError,
}: FeatureFormProps) {
  const [features, setFeatures] =
  useState<Partial<CancerFeatures>>(sampleValues)

  const handleChange = (
    key: keyof CancerFeatures,
    value: string,
  ) => {
    setFeatures((previous) => ({
      ...previous,
      [key]:
        value === ''
          ? undefined
          : Number.parseFloat(value),
    }))
  }

  const fillSample = () => {
    setFeatures(sampleValues)
    setError(null)
  }

  const clearForm = () => {
    setFeatures({})
    setError(null)
    onPredict(null as never)
  }

  const handlePredict = async () => {
    const missing = featureGroups
      .flatMap((group) => group.keys)
      .filter(
        (key) =>
          features[key] === undefined ||
          features[key] === null ||
          Number.isNaN(features[key]),
      )

    if (missing.length > 0) {
      setError(
        `Please provide all 30 features. Missing: ${missing.length}`,
      )
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await predictCancer(
        features as CancerFeatures,
      )

      onPredict(response.data)
    } catch (error: any) {
      setError(
        error?.response?.data?.detail ||
          error?.message ||
          'Unable to connect to the prediction API.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="feature-form">
      <div className="form-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={fillSample}
          disabled={loading}
        >
          Reset Sample
        </button>

        <button
          type="button"
          className="btn-secondary ghost"
          onClick={clearForm}
          disabled={loading}
        >
          Clear
        </button>
      </div>

      {featureGroups.map((group, index) => (
        <div className="feature-group" key={group.label}>
          <div className="group-heading">
            <div className="group-number">
              0{index + 1}
            </div>

            <div>
              <h3>{group.label}</h3>
              <p>{group.description}</p>
            </div>
          </div>

          <div className="feature-grid">
            {group.keys.map((key) => (
              <label className="feature-input" key={key}>
                <span>{formatLabel(key)}</span>

                <input
                  type="number"
                  step="any"
                  value={features[key] ?? ''}
                  onChange={(event) =>
                    handleChange(key, event.target.value)
                  }
                  disabled={loading}
                  placeholder="0.00"
                />
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        className="btn-primary"
        type="button"
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner" />
            Running Inference...
          </>
        ) : (
          <>
            Analyze Tumor
            <span>→</span>
          </>
        )}
      </button>
    </div>
  )
}