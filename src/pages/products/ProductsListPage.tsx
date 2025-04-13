import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import DataTable from "../../components/tables/DataTable";
import Modal from "../../components/ui/Modal";
import PageHeader from "../../components/ui/PageHeader";
import ProductForm from "../../features/products/ProductForm";
import IProduct from "../../types/IProduct";

// Socket connection to the WebSocket server
const socket = io("http://localhost:8080/products", {
  withCredentials: true,
  transports: ["websocket"],
});

const ProductsListPage = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    // Ensure the socket connection is open
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.emit("findAllProduct");

    // Listen for the response when fetching all products
    socket.on("findAllProduct", (response) => {
      if (response) {
        setProducts(response);
      } else {
        // Handle error case
        console.error("Socket error:", response.error);
      }
      // setIsLoading(false);
    });

    // Listen for product updates and update the list when a product is updated
    socket.on("productUpdated", (updatedProduct) => {
      if (updatedProduct) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProduct._id
              ? { ...product, ...updatedProduct }
              : product
          )
        );
      } else {
        console.error("Error: productUpdated event received without data.");
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off("findAllProduct");
      socket.off("productUpdated"); // Remove the event listener for product updates
    };
  }, []);

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
