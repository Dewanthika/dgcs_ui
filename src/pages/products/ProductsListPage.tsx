import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "../../components/tables/DataTable";
import Modal from "../../components/ui/Modal";
import PageHeader from "../../components/ui/PageHeader";
import ProductForm from "../../features/products/ProductForm";
import useGetAllProduct from "../../hooks/useGetAllProduct";

import IProduct from "../../types/IProduct";

const ProductsListPage = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined
  );
  const products = useGetAllProduct();

  useEffect(() => {
    if (selectedProduct) {
      const updatedProduct = products.find(
        (p) => p._id === selectedProduct._id
      );
      if (updatedProduct) {
        setSelectedProduct(updatedProduct);
      }
    }
  }, [products, selectedProduct]);

  const handleEditClick = (product: IProduct) => {
    setSelectedProduct(product);
    setShowAddUserModal(true);
  };

  const handleModalClose = () => {
    setShowAddUserModal(false);
    setSelectedProduct(undefined);
  };

  return (
    <>
      <PageHeader
        title="Product Management"
        action={
          <button
            onClick={() => {
              setSelectedProduct(undefined);
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
          {
            header: "Actions",
            accessor: (user) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(user);
                }}
                className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
              >
                Edit
              </button>
            ),
          },
        ]}
        data={products}
        keyExtractor={(user) => user?._id || "unknown-id"}
      />

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={showAddUserModal}
        onClose={handleModalClose}
        title={selectedProduct ? "Edit Product" : "Add Product"}
        maxWidth="4xl"
      >
        <ProductForm
          initialData={selectedProduct}
          onCancel={handleModalClose}
        />
      </Modal>
    </>
  );
};

export default ProductsListPage;
