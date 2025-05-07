import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import SearchBar from "../../components/ui/SearchBar";
import ActionButtons from "../../components/ui/ActionButtons";
import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/tables/DataTable";
import Modal from "../../components/ui/Modal";
import CompanyForm from "../../features/company/CompanyForm";
import useFetch from "../../hooks/useFetch";
import useApiFetch from "../../hooks/useApiFetch";
import ICompany from "../../types/ICompany";

const CompanyPage = () => {
  const {
    data: fetchedCompanies,
  } = useFetch<ICompany[]>({
    url: "/company",
    initialLoad: true,
  });
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<ICompany | undefined>(
    undefined
  );

  // Sync fetched companies to local state
  useEffect(() => {
    if (fetchedCompanies) {
      setCompanies(fetchedCompanies);
    }
  }, [fetchedCompanies]);

  // Create company API hook
  const {
    postData: createCompany,
  } = useApiFetch<ICompany>({
    url: "/company",
    options: { method: "post" },
  });

  // Update company API hook
  const {
    postData: updateCompany,
  } = useApiFetch<ICompany>({
    url: currentCompany ? `/company/${currentCompany._id}` : "",
    options: { method: "patch" },
  });

  // Delete company API hook
  const {
    postData: deleteCompany,
  } = useApiFetch<ICompany>({
    url: currentCompany ? `/company/${currentCompany._id}` : "",
    options: { method: "delete" },
  });

  const handleAddCompany = async (
    companyData: Omit<ICompany, "_id">
  ) => {
    if (currentCompany) {
      // Update existing company
      const updated = await updateCompany(companyData);
      if (updated) {
        setCompanies(
          companies.map((company) =>
            company._id === currentCompany._id ? updated : company
          )
        );
      }
    } else {
      // Add new company
      const created = await createCompany(companyData);
      if (created) {
        setCompanies([...companies, created]);
      }
    }

    setShowAddCompanyModal(false);
    setCurrentCompany(undefined);
  };

  const handleEditCompany = (company: ICompany) => {
    setCurrentCompany(company);
    setShowAddCompanyModal(true);
  };

  const handleDeleteCompany = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      setCurrentCompany(companies.find((c) => c._id === id));
      const deleted = await deleteCompany({} as ICompany);
      if (deleted) {
        setCompanies(companies.filter((company) => company._id !== id));
      }
      setCurrentCompany(undefined);
    }
  };

  // Filter companies based on search term
  // const filteredCompanies = companies.filter(
  //   (company) =>
  //     company.CMPName.toLowerCase().includes(searchTerm.toLowerCase()) 
  //     company.companyID.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     company.billRefNo.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const columns = [
    { header: "Company ID", accessor: (company: ICompany) => company?._id?.slice(15) },
    // { header: "Company Name", accessor:(company: ICompany) => company.CMPName },
    // { header: "Phone", accessor:(company: ICompany) =>company.CMPPhone },
    { header: "Payment Terms", accessor: (company: ICompany) => company.paymentTerms },
    {
      header: "Credit Limit",
      accessor: (company: ICompany) => `LKR ${company.creditLimit}`,
    },
    {
      header: "Actions",
      accessor: (company: ICompany) => (
        <ActionButtons
          onEdit={() => handleEditCompany(company)}
          onDelete={() => handleDeleteCompany(company._id || "")}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Company Management"
        action={
          <button
            onClick={() => {
              setCurrentCompany(undefined);
              setShowAddCompanyModal(true);
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
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search companies..."
          />
        </div>
      </div>

      {/* Companies List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <DataTable
          columns={columns}
          data={companies}
          keyExtractor={(company: ICompany) => company?._id || ""}
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
          setShowAddCompanyModal(false);
          setCurrentCompany(undefined);
        }}
        title={currentCompany ? "Edit Company" : "Add Company"}
      >
        <CompanyForm
          initialData={currentCompany}
          onSubmit={handleAddCompany}
          onCancel={() => {
            setShowAddCompanyModal(false);
            setCurrentCompany(undefined);
          }}
        />
      </Modal>
    </>
  );
};

export default CompanyPage;
