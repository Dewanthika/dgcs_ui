import { UserPlus } from "lucide-react";
import { useState } from "react";
import DataTable from "../../components/tables/DataTable";
import Modal from "../../components/ui/Modal";
import PageHeader from "../../components/ui/PageHeader";
import ProductForm from "../../features/products/ProductForm";
import useGetAllProduct from "../../hooks/useGetAllProduct";

const ProductsListPage = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const products = useGetAllProduct();

  return (
    <>
      <PageHeader
        title="Product Management"
        action={
          <button
            onClick={() => {
              setShowAddUserModal(true);
            }}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
          >
            <UserPlus className="w-5 h-5 mr-1" />
            Add Product
          </button>
        }
      />

      <DataTable
        columns={[
          { header: "Name", accessor: (user) => user.productName },
          { header: "Price", accessor: (user) => user.price },
          { header: "Stock", accessor: (user) => user.stock },
          { header: "Weight", accessor: (user) => user.weight },
        ]}
        data={products}
        keyExtractor={(user) => user?._id || "unknown-id"}
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
        title={"Add User"}
        maxWidth="4xl"
      >
        <ProductForm
          // initialData={currentUser}
          onCancel={() => {
            setShowAddUserModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ProductsListPage;
