import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  action?: ReactNode
}

const PageHeader = ({ title, action }: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {action}
    </div>
  )
}

export default PageHeader

