import type React from "react"

import { useState } from "react"
import type { Company } from "../../types"
import FormField from "../../components/ui/FormField"

interface CompanyFormProps {
  initialData?: Company
  onSubmit: (data: Omit<Company, "id" | "companyID">) => void
  onCancel: () => void
}

const CompanyForm = ({ initialData, onSubmit, onCancel }: CompanyFormProps) => {
  const isEditing = !!initialData

  const [formData, setFormData] = useState<Omit<Company, "id" | "companyID">>({
    cmpName: initialData?.cmpName || "",
    cmpPhone: initialData?.cmpPhone || "",
    cmpAddress: initialData?.cmpAddress || "",
    billRefNo: initialData?.billRefNo || "",
    paymentTerms: initialData?.paymentTerms || "Net 30 Days",
    creditLimit: initialData?.creditLimit || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Company Name" id="cmpName" required>
        <input
          type="text"
          id="cmpName"
          name="cmpName"
          value={formData.cmpName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </FormField>

      <FormField label="Contact" id="cmpPhone" required>
        <input
          type="tel"
          id="cmpPhone"
          name="cmpPhone"
          value={formData.cmpPhone}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </FormField>

      <FormField label="Address" id="cmpAddress" required>
        <input
          type="text"
          id="cmpAddress"
          name="cmpAddress"
          value={formData.cmpAddress}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </FormField>

      <FormField label="Business Registration Number" id="billRefNo" required>
        <input
          type="text"
          id="billRefNo"
          name="billRefNo"
          value={formData.billRefNo}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </FormField>

      <FormField label="Credit Limit" id="creditLimit" required>
        <input
          type="number"
          id="creditLimit"
          name="creditLimit"
          value={formData.creditLimit}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </FormField>

      <FormField label="Payment Terms" id="paymentTerms" required>
        <select
          id="paymentTerms"
          name="paymentTerms"
          value={formData.paymentTerms}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="Net 15 Days">Net 15 Days</option>
          <option value="Net 30 Days">Net 30 Days</option>
          <option value="Net 45 Days">Net 45 Days</option>
          <option value="Net 60 Days">Net 60 Days</option>
          <option value="Due on Receipt">Due on Receipt</option>
        </select>
      </FormField>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          {isEditing ? "Update Company" : "Add Company"}
        </button>
      </div>
    </form>
  )
}

export default CompanyForm

