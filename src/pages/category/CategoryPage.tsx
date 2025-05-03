import { UserPlus } from "lucide-react";
import { useState } from "react";
import DataTable from "../../components/tables/DataTable";
import Modal from "../../components/ui/Modal";
import PageHeader from "../../components/ui/PageHeader";
import CategoryForm from "../../features/category";
import useGetAllCategory from "../../hooks/useGetAllCategory";
import ICategory from "../../types/ICategory";

const CategoryPage = () => {
  const { data, fetchData } = useGetAllCategory();
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const [currentCategory , setCurrentCategory] = useState<ICategory | undefined>(undefined);

  return (
    <div>
      <PageHeader
        title="Category"
        action={
          <button
            onClick={() => {
              setShowAddUserModal(true);
            }}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
          >
            <UserPlus className="w-5 h-5 mr-1" />
            Add Category
          </button>
        }
      />
      <DataTable
        columns={[
          { header: "Name", accessor: (category) => category.name },
          { header: "Status", accessor: (category) => category.status },
          {
            header:"Actions",
            accessor: (category) => (
              <button onClick={() => {setCurrentCategory(category);setShowAddUserModal(true)}} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">Edit</button>
            )
          }
        ]}
        data={data}
        keyExtractor={(category) => category?._id || "unknown-id"}
        // emptyMessage={
        //   searchTerm || roleFilter !== "all" || statusFilter !== "all"
        //     ? "No users found. Try changing your filters."
        //     : "No users found. Add some users to get started."
        // }
      />

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={showAddUserModal}
        onClose={() => {
          setShowAddUserModal(false);
          setCurrentCategory(undefined);
        }}
        title={currentCategory ? "Edit Category" : "Add Category"}
        maxWidth="4xl"
      >
        <CategoryForm
          // initialData={currentUser}
          initialData={currentCategory}
          onCancel={() => {
            setShowAddUserModal(false);
            setCurrentCategory(undefined);
            fetchData();
            // setCurrentUser(undefined);
          }}
        />
      </Modal>
    </div>
  );
};

export default CategoryPage;
