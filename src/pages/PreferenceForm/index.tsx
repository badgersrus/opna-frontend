import React, { useState } from "react"
import axios from "axios"
import { useProjects } from "../context/ProjectContext"
import { baseUrl } from "../api/util"

interface Range {
  min: number
  max: number
}

interface Preferences {
  financialReturns?: Range
  costEffectiveness?: Range
  projectType?: string
  carbonReductionPotential?: Range
  regulatoryCompliance?: boolean
  riskProfile?: string
  projectLifespan?: Range
  environmentalImpact?: string
  scalability?: boolean
  managementTeamExpertise?: string
  mrvTransparency?: string
}

const emptyPreferences: Preferences = {
  financialReturns: undefined,
  costEffectiveness: undefined,
  projectType: undefined,
  carbonReductionPotential: undefined,
  regulatoryCompliance: undefined,
  riskProfile: undefined,
  projectLifespan: undefined,
  environmentalImpact: undefined,
  scalability: undefined,
  managementTeamExpertise: undefined,
  mrvTransparency: undefined,
}

const projectTypeOptions = [
  "",
  "Direct Air Capture",
  "Reforestation",
  "Carbon Farming",
  "Renewable Energy",
  "EV Infrastructure",
  "Methane Capture",
]
const lowMediumHighOptions = ["", "Low", "Medium", "High"]
const managementTeamExpertiseOptions = ["", "Low", "Medium", "High", "Expert"]

const PreferencesForm: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>(emptyPreferences)
  const { dispatch } = useProjects()

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNumberInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    const [key, subKey] = name.split(".")

    setPreferences((prev) => ({
      ...prev,
      [key]: {
        [subKey]: Number(value),
      },
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${baseUrl}/match`,
        preferences
      )
      dispatch({ type: "SET_PROJECTS", payload: response.data })
    } catch (error) {
      console.error("Error submitting preferences:", error)
    }
  }

  const handleReset = () => {
    setPreferences(emptyPreferences)
    dispatch({ type: "RESET_PROJECTS" })
  }

  return (
    <div>
      <form className="form-container flex-form" onSubmit={handleSubmit}>
        <div className="form-column">
          <div className="form-field">
            <label>
              Financial Returns Minimum:
              <input
                type="number"
                step="0.1"
                name="financialReturns.min"
                value={preferences.financialReturns?.min}
                onChange={handleNumberInputChange}
              />
            </label>
          </div>

          {/* Cost Effectiveness */}
          <div className="form-field">
            <label>
              Cost Min:
              <input
                type="number"
                step="5"
                name="costEffectiveness.min"
                value={preferences.costEffectiveness?.min}
                onChange={handleNumberInputChange}
              />
            </label>
            <label>
              Cost Max:
              <input
                type="number"
                step="5"
                name="costEffectiveness.max"
                value={preferences.costEffectiveness?.max}
                onChange={handleNumberInputChange}
              />
            </label>
          </div>

          {/* Carbon Reduction Potential */}
          <div className="form-field">
            <label>
              Carbon Reduction Minimum:
              <input
                type="number"
                step="1000"
                name="carbonReductionPotential.min"
                value={preferences.carbonReductionPotential?.min}
                onChange={handleNumberInputChange}
              />
            </label>
          </div>
        </div>
        <div className="form-column">
          {/* Project Lifespan */}
          <div className="form-field">
            <label>
              Length Min:
              <input
                type="number"
                name="projectLifespan.min"
                value={preferences.projectLifespan?.min}
                onChange={handleNumberInputChange}
              />
            </label>
            <label>
              Length Max:
              <input
                type="number"
                name="projectLifespan.max"
                value={preferences.projectLifespan?.max}
                onChange={handleNumberInputChange}
              />
            </label>
          </div>
          {/* Risk Profile */}
          <div className="form-field">
            <label>
              Risk Profile:
              <select name="riskProfile" onChange={handleDropdownChange}>
                {lowMediumHighOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Project Type */}
          <div className="form-field">
            <label>
              Project Type:
              <select name="projectType" onChange={handleDropdownChange}>
                {projectTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="form-column">
          {/* Environmental Impact */}
          <div className="form-field">
            <label>
              Environmental Impact:
              <select
                name="environmentalImpact"
                onChange={handleDropdownChange}
              >
                {lowMediumHighOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Management Team Expertise */}
          <div className="form-field">
            <label>
              Management Expertise:
              <select
                name="managementTeamExpertise"
                onChange={handleDropdownChange}
              >
                {managementTeamExpertiseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* MRV Mechanisms */}
          <div className="form-field">
            <label>
              MRV Transaparency:
              <select name="mrvTransparency" onChange={handleDropdownChange}>
                {lowMediumHighOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
        <button type="reset" className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  )
}

export default PreferencesForm
