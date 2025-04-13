import React, { useState } from "react";
import DataTable from "../../components/tables/DataTable";
import useGetAllCategory from "../../hooks/useGetAllCategory";
import PageHeader from "../../components/ui/PageHeader";
import { UserPlus } from "lucide-react";
import Modal from "../../components/ui/Modal";
import CategoryForm from "../../features/category";

const CategoryPage = () => {
  const { data, fetchData } = useGetAllCategory();
  const [showAddUserModal, setShowAddUserModal] = useState(false);

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
        }}
        title={"Add Category"}
        maxWidth="4xl"
      >
        <CategoryForm
          // initialData={currentUser}
          onCancel={() => {
            setShowAddUserModal(false);
            fetchData();
            // setCurrentUser(undefined);
          }}
        />
      </Modal>
    </div>
  );
};

export default CategoryPage;
