import React, { createContext, useContext, useReducer, ReactNode } from "react"
import { Project } from "../ProjectsTable"

interface ProjectsState {
  projects: Project[]
  initialProjects: Project[]
}

type ProjectAction =
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "INITIALISE_PROJECTS"; payload: Project[] }
  | { type: "RESET_PROJECTS" }

const initialState: ProjectsState = { projects: [], initialProjects: [] }

const ProjectContext = createContext<{
  state: ProjectsState
  dispatch: React.Dispatch<ProjectAction>
}>({ state: initialState, dispatch: () => null })

const projectReducer = (state: ProjectsState, action: ProjectAction) => {
  switch (action.type) {
    case "INITIALISE_PROJECTS":
      return { ...state, projects: action.payload, initialProjects: action.payload }
    case "SET_PROJECTS":
      return { ...state, projects: action.payload }
    case "RESET_PROJECTS":
      return { ...state, projects: state.initialProjects }
    default:
      return state
  }
}

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
    const [state, dispatch] = useReducer(projectReducer, initialState)

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => useContext(ProjectContext)
