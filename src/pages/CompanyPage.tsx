import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface Company {
  id: number
  companyID: string
  cmpName: string
  cmpPhone: string
  cmpAddress: string
  billRefNo: string
  paymentTerms: string
  creditLimit: string
}

const CompanyPage = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false)
  const [newCompany, setNewCompany] = useState<Company>({
    id: 0,
    companyID: "",
    cmpName: "",
    cmpPhone: "",
    cmpAddress: "",
    billRefNo: "",
    paymentTerms: "Net 30 Days",
    creditLimit: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Load mock companies data
    const mockCompanies: Company[] = [
      {
        id: 1,
        companyID: "COMP001",
        cmpName: "Acme Corporation",
        cmpPhone: "+94 123 456 789",
        cmpAddress: "123 Main Street, Colombo, Western Province, 10100",
        billRefNo: "BILL001",
        paymentTerms: "Net 30 Days",
        creditLimit: "100000",
      },
      {
        id: 2,
        companyID: "COMP002",
        cmpName: "Global Enterprises",
        cmpPhone: "+94 987 654 321",
        cmpAddress: "456 Business Avenue, Kandy, Central Province, 20000",
        billRefNo: "BILL002",
        paymentTerms: "Net 15 Days",
        creditLimit: "75000",
      },
    ]

    setCompanies(mockCompanies)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewCompany((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing) {
      // Update existing company
      setCompanies(companies.map((company) => (company.id === newCompany.id ? newCompany : company)))
      setIsEditing(false)
    } else {
      // Add new company
      const companyToAdd = {
        ...newCompany,
        id: Date.now(),
        companyID: `COMP${Math.floor(1000 + Math.random() * 9000)}`,
      }
      setCompanies([...companies, companyToAdd])
    }

    // Reset form and close modal
    setNewCompany({
      id: 0,
      companyID: "",
      cmpName: "",
      cmpPhone: "",
      cmpAddress: "",
      billRefNo: "",
      paymentTerms: "Net 30 Days",
      creditLimit: "",
    })
    setShowAddCompanyModal(false)
  }

  const handleEditCompany = (company: Company) => {
    setNewCompany(company)
    setIsEditing(true)
    setShowAddCompanyModal(true)
  }

  const handleDeleteCompany = (id: number) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      setCompanies(companies.filter((company) => company.id !== id))
    }
  }

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    (company) =>
      company.cmpName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.companyID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.billRefNo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Company Management</h1>
        <button
          onClick={() => {
            setIsEditing(false)
            setNewCompany({
              id: 0,
              companyID: "",
              cmpName: "",
              cmpPhone: "",
              cmpAddress: "",
              billRefNo: "",
              paymentTerms: "Net 30 Days",
              creditLimit: "",
            })
            setShowAddCompanyModal(true)
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add Company
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Companies List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Company ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Company Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Bill Ref No</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment Terms</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Credit Limit</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{company.companyID}</td>
                    <td className="px-4 py-3 text-sm">{company.cmpName}</td>
                    <td className="px-4 py-3 text-sm">{company.cmpPhone}</td>
                    <td className="px-4 py-3 text-sm">{company.billRefNo}</td>
                    <td className="px-4 py-3 text-sm">{company.paymentTerms}</td>
                    <td className="px-4 py-3 text-sm">LKR {company.creditLimit}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                          onClick={() => handleEditCompany(company)}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                          onClick={() => handleDeleteCompany(company.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    No companies found.{" "}
                    {searchTerm ? "Try changing your search term." : "Add some companies to get started."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Company Modal */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">{isEditing ? "Edit Company" : "Add Company"}</h2>

            <form onSubmit={handleAddCompany} className="space-y-4">
              <div>
                <label htmlFor="cmpName" className="block text-sm font-medium text-gray-700 mb-1">
                  Company name
                </label>
                <input
                  type="text"
                  id="cmpName"
                  name="cmpName"
                  value={newCompany.cmpName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="cmpPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  type="tel"
                  id="cmpPhone"
                  name="cmpPhone"
                  value={newCompany.cmpPhone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="cmpAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="cmpAddress"
                  name="cmpAddress"
                  value={newCompany.cmpAddress}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="billRefNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Registration Number
                </label>
                <input
                  type="text"
                  id="billRefNo"
                  name="billRefNo"
                  value={newCompany.billRefNo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="creditLimit" className="block text-sm font-medium text-gray-700 mb-1">
                  Credit Limit
                </label>
                <input
                  type="number"
                  id="creditLimit"
                  name="creditLimit"
                  value={newCompany.creditLimit}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Terms
                </label>
                <select
                  id="paymentTerms"
                  name="paymentTerms"
                  value={newCompany.paymentTerms}
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
              </div>

              <div className="mt-6 flex justify-center">
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  {isEditing ? "Update Company" : "Add Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default CompanyPage

