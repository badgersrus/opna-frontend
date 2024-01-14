interface TableCellProps {
  value: string
  context:
    | "riskProfile"
    | "mrvTransparency"
    | "managementTeamExpertise"
    | "environmentalImpact"
}

type ColorMapping = {
  [key in
    | "riskProfile"
    | "mrvTransparency"
    | "managementTeamExpertise"
    | "environmentalImpact"]: {
    Low: string
    Medium: string
    High: string
    Expert?: string
  }
}

const colorMappings: ColorMapping = {
  riskProfile: {
    Low: "#2ECC40",
    Medium: "#FFDC00",
    High: "#FF4136",
  },
  mrvTransparency: {
    Low: "#FF4136",
    Medium: "#FFDC00",
    High: "#2ECC40",
  },
  environmentalImpact: {
    Low: "#FF4136",
    Medium: "#FFDC00",
    High: "#2ECC40",
  },
  managementTeamExpertise: {
    Low: "#FF4136",
    Medium: "#FFDC00",
    High: "#2ECC40",
    Expert: "#3D9970",
  },
}


const TableCell: React.FC<TableCellProps> = ({ value, context }) => {
  const getColor = (value: string, context: keyof ColorMapping) => {
    return colorMappings[context]?.[value] || "black"
  }

  const backgroundColor = getColor(value, context)

  return <td style={{ backgroundColor }}>{value}</td>
}

export default TableCell