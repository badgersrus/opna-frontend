import React, { useState } from "react"
import { useInvestment } from "../context/InvestmentContext";


const InvestmentForm: React.FC = () => {
  const [investment, setLocalInvestment] = useState<string>("")
  const { dispatch } = useInvestment();

  const handleNumberInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value) || 0
    setLocalInvestment(event.target.value)
    dispatch({ type: 'SET_INVESTMENT', payload: value})
  }

  return (
    <div>
      <div className="form-container">
        <label>
          Investment:
          <input
            type="number"
            step="10000"
            name="investment"
            value={investment}
            onChange={handleNumberInputChange}
            />
        </label>
      </div>
    </div>
  )
}

export default InvestmentForm
