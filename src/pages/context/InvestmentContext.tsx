import React, { createContext, useContext, useReducer, ReactNode } from "react"

interface InvestmentState {
  investment: number
}

type InvestmentAction = {
  type: "SET_INVESTMENT"
  payload: number
}

const InvestmentContext = createContext<{
  state: InvestmentState
  dispatch: React.Dispatch<InvestmentAction>
}>({ state: { investment: 0 }, dispatch: () => null })

const investmentReducer = (
  state: InvestmentState,
  action: InvestmentAction
) => {
  switch (action.type) {
    case "SET_INVESTMENT":
      return { ...state, investment: action.payload }
    default:
      return state
  }
}

export const InvestmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(investmentReducer, { investment: 0 })

  return (
    <InvestmentContext.Provider value={{ state, dispatch }}>
      {children}
    </InvestmentContext.Provider>
  )
}

export const useInvestment = () => useContext(InvestmentContext)
