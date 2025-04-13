
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import FileInput from "../../components/ui/FileUpload";
import FormField from "../../components/ui/FormField";
import { convertFileToBase64 } from "../../helpers/generalHelper";
import useGetAllCategory from "../../hooks/useGetAllCategory";
import type { ProductFormData } from "../../types";
import IProduct from "../../types/IProduct";

interface ProductFormProps {
  initialData?: ProductFormData;
  onCancel: () => void;
}

// Socket connection to the WebSocket server
const socket = io("http://localhost:8080/products", {
  withCredentials: true,
});

const ProductForm = ({ initialData, onCancel }: ProductFormProps) => {
  const { data: category } = useGetAllCategory();
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IProduct>({});
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const filesArray = Array.from(e.target.files);
  //     setFormData((prev) => ({
  //       ...prev,
  //       images: [...prev.images, ...filesArray],
  //     }));

  //     // Create preview URLs
  //     const newPreviewUrls = filesArray.map((file) =>
  //       URL.createObjectURL(file)
  //     );
  //     setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  //   }
  // };

  // const handleRemoveImage = (index: number) => {
  //   // Remove image from formData
  //   const newImages = [...formData.images];
  //   newImages.splice(index, 1);
  //   setFormData((prev) => ({ ...prev, images: newImages }));

  //   // Remove preview URL and revoke object URL to free memory
  //   URL.revokeObjectURL(previewUrls[index]);
  //   const newPreviewUrls = [...previewUrls];
  //   newPreviewUrls.splice(index, 1);
  //   setPreviewUrls(newPreviewUrls);
  // };


  const onSubmit = async (data: IProduct) => {
    console.log("Form submitted:", data);

    let base64: string | undefined;

    // Handle file conversion to base64
    if (data.image) {
      let file: File;
      
      if (data.image instanceof FileList && data.image.length > 0) {
        file = data.image[0];
        base64 = await convertFileToBase64(file);
      }
    }

    // Destructure and exclude image (imgUrl should not go to backend)
    const {
      imageURL, // ignore
      ...rest
    } = data;

    const createProductDto = {
      ...rest,
    };

    const payload = {
      createProductDto,
      file: base64,
    };

    try {
      // if (isEdit) {
      //   socket.emit("updateProduct", {
      //     id,
      //     updateProductDto: createProductDto,
      //     file: base64,
      //   });
      // } else {
      // }
      socket.emit("createProduct", payload);
      onCancel()
      // navigator("/product");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Product Name" id="productName" required>
          <input
            type="text"
            id="productName"
            {...register("productName", {
              required: "Product name is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </FormField>

        <FormField label="Price" id="price" required>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "Price is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Category" id="categoryID" required>
          <select
            id="categoryID"
            {...register("categoryID", {
              required: "Product name is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Category</option>
            {category?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
            {/* <option value="1">Gloves</option>
            <option value="2">Helment</option>
            <option value="3">Gum Boot</option>
            <option value="4">Earmuff</option>
            <option value="5">Safety Spectacles</option> */}
          </select>
        </FormField>

        <FormField label="Weight (kg)" id="weight" required>
          <input
            type="number"
            id="weight"
            {...register("weight", {
              required: "Product name is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Initial Stock" id="stock" required>
          <input
            type="number"
            id="stock"
            {...register("stock", {
              required: "Product name is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </FormField>
      </div>

      <FormField label="Product Images" id="images">
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <FileInput
            {...register("image", {
              required: "Product name is required",
            })}
          />
        </div>
{/* 
        {previewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Preview ${index}`}
                  className="h-24 w-24 object-cover rounded-md border"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleRemoveImage(index);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )} */}
      </FormField>

      <FormField label="Description" id="productDescription" required>
        <textarea
          id="productDescription"
          {...register("productDescription", {
            required: "Product name is required",
          })}
          rows={5}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </FormField>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {isEditing ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
