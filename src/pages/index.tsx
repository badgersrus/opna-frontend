import { Inter } from "next/font/google"
import ProjectsTable from "./ProjectsTable"
import PreferenceForm from "./PreferenceForm"
import InvestmentForm from "./InvestmentForm"
import { ProjectProvider } from "./context/ProjectContext"
import { InvestmentProvider } from "./context/InvestmentContext"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <InvestmentProvider>
        <ProjectProvider>
          <ProjectsTable/>
          <PreferenceForm />
          <InvestmentForm />
        </ProjectProvider>
        </InvestmentProvider>
      </div>
    </main>
  )
}
