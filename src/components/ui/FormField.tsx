import type { ReactNode } from "react"

interface FormFieldProps {
  label: string
  id: string
  error?: string
  children: ReactNode
  required?: boolean
}

const FormField = ({ label, id, error, children, required = false }: FormFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default FormField

