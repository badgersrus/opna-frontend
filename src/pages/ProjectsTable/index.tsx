import React, { useEffect, useState } from "react"
import TableCell from "./TableCell"
import { useInvestment } from "../context/InvestmentContext"
import { useProjects } from "../context/ProjectContext"
import { baseUrl } from "../api/util"
import axios from "axios"

export interface Project {
  projectType: string
  carbonReductionPotential: number
  costEffectiveness: number
  financialReturns: number
  riskProfile: string
  projectLifespan: number
  environmentalImpact: string
  managementTeamExpertise: string
  mrvTransparency: string
  score?: number
  yield?: number
}

function numberWithCommas(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const ProjectsTable: React.FC = () => {
  const [updatedProjects, setUpdatedProjects] = useState<Project[]>([])
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const { state: projectState, dispatch } = useProjects()
  const { state: investmnetState } = useInvestment()
  const { projects } = projectState
  const { investment } = investmnetState

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${baseUrl}/projects`)
        dispatch({ type: "INITIALISE_PROJECTS", payload: response.data })
      } catch (error) {
        console.error("Error intiialising projects:", error)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
      const projectsWithYield = projects.map((project) => {
        const yieldValue = calculateYield(
          project.financialReturns,
          project.projectLifespan,
          investment
        )
        return { ...project, yield: yieldValue }
      })
      setUpdatedProjects(projectsWithYield)
  }, [projects, investment])

  const calculateYield = (
    annualReturnRate: number,
    lifespan: number,
    investment: number
  ): number => {
    const rateAsDecimal = annualReturnRate / 100
    const debtYield = investment * Math.pow(1 + rateAsDecimal, lifespan)
    return Math.round(debtYield * 0.1)
  }

  const sortProjects = (order: "asc" | "desc") => {
    const sortedProjects = [...updatedProjects].sort((a, b) => {
      const yieldA = a.yield || 0
      const yieldB = b.yield || 0
      return order === "asc" ? yieldA - yieldB : yieldB - yieldA
    })
    setUpdatedProjects(sortedProjects)
  }

  const handleSortClick = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"
    setSortOrder(newOrder)
    sortProjects(newOrder)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Project Type</th>
          <th>Carbon Reduction Potential</th>
          <th>Cost Effectiveness</th>
          <th>Financial Returns</th>
          <th>Risk Profile</th>
          <th>Project Lifespan</th>
          <th>Environmental Impact</th>
          <th>Management Expertise</th>
          <th>MRV Mechanisms</th>
          <th>Score</th>
          <th onClick={handleSortClick} style={{ cursor: "pointer" }}>
            Yield
          </th>
        </tr>
      </thead>
      <tbody>
        {updatedProjects.map((project, index) => (
          <tr key={index}>
            <td>{project.projectType}</td>
            <td>{numberWithCommas(project.carbonReductionPotential)} tonnes</td>
            <td>£ {project.costEffectiveness} /tonne</td>
            <td>{project.financialReturns}%</td>
            <TableCell value={project.riskProfile} context="riskProfile" />
            <td>{project.projectLifespan} years</td>
            <TableCell
              value={project.environmentalImpact}
              context="environmentalImpact"
            />
            <TableCell
              value={project.managementTeamExpertise}
              context="managementTeamExpertise"
            />
            <TableCell
              value={project.mrvTransparency}
              context="mrvTransparency"
            />
            <td>{project.score}</td>
            <td className="yield-column">
              {project?.yield !== undefined ? "£" : ""}
              {project?.yield !== undefined
                ? numberWithCommas(project.yield)
                : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProjectsTable
