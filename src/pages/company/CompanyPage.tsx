import { useState, useEffect } from "react"
import type { Company } from "../../types"
import { Plus } from "lucide-react"
import SearchBar from "../../components/ui/SearchBar"
import ActionButtons from "../../components/ui/ActionButtons"
import PageHeader from "../../components/ui/PageHeader"
import DataTable from "../../components/tables/DataTable"
import Modal from "../../components/ui/Modal"
import CompanyForm from "../../features/company/CompanyForm"

const CompanyPage = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false)
  const [currentCompany, setCurrentCompany] = useState<Company | undefined>(undefined)

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

  // Update the handleAddCompany function to correctly handle form submission
  const handleAddCompany = (companyData: Omit<Company, "id" | "companyID">) => {
    if (currentCompany) {
      // Update existing company
      setCompanies(
        companies.map((company) =>
          company.id === currentCompany.id ? { ...currentCompany, ...companyData } : company,
        ),
      )
    } else {
      // Add new company
      const newCompany: Company = {
        ...companyData,
        id: Date.now(),
        companyID: `COMP${Math.floor(1000 + Math.random() * 9000)}`,
      }
      setCompanies([...companies, newCompany])
    }

    setShowAddCompanyModal(false)
    setCurrentCompany(undefined)
  }

  const handleEditCompany = (company: Company) => {
    setCurrentCompany(company)
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

  const columns = [
    { header: "Company ID", accessor: "companyID" },
    { header: "Company Name", accessor: "cmpName" },
    { header: "Phone", accessor: "cmpPhone" },
    { header: "Bill Ref No", accessor: "billRefNo" },
    { header: "Payment Terms", accessor: "paymentTerms" },
    {
      header: "Credit Limit",
      accessor: (company: Company) => `LKR ${company.creditLimit}`,
    },
    {
      header: "Actions",
      accessor: (company: Company) => (
        <ActionButtons onEdit={() => handleEditCompany(company)} onDelete={() => handleDeleteCompany(company.id)} />
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Company Management"
        action={
          <button
            onClick={() => {
              setCurrentCompany(undefined)
              setShowAddCompanyModal(true)
            }}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add Company
          </button>
        }
      />

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search companies..." />
        </div>
      </div>

      {/* Companies List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <DataTable
        // @ts-expect-error @ts-ignore
          columns={columns}
          data={filteredCompanies}
          keyExtractor={(company) => company.id}
          emptyMessage={
            searchTerm
              ? "No companies found. Try changing your search term."
              : "No companies found. Add some companies to get started."
          }
        />
      </div>

      {/* Add/Edit Company Modal */}
      <Modal
        isOpen={showAddCompanyModal}
        onClose={() => {
          setShowAddCompanyModal(false)
          setCurrentCompany(undefined)
        }}
        title={currentCompany ? "Edit Company" : "Add Company"}
      >
        <CompanyForm
          initialData={currentCompany}
          onSubmit={handleAddCompany}
          onCancel={() => {
            setShowAddCompanyModal(false)
            setCurrentCompany(undefined)
          }}
        />
      </Modal>
    </>
  )
}

export default CompanyPage

