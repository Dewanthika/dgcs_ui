import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../../components/ui/FormField";
import useApiFetch from "../../hooks/useApiFetch";
import ICategory from "../../types/ICategory";
import { useEffect } from "react";

interface ICategoryFormProps {
  initialData?: ICategory;
  onCancel: () => void;
}

const CategoryForm = ({ initialData, onCancel }: ICategoryFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>({
    defaultValues: {
      name: "",
      status: "active",
    },
  });

  const {
    postData,
    isLoading,
    error,
  } = useApiFetch<ICategory>({
    url: initialData ? `/category/${initialData._id}` : `/category/`,
    options: {
      method: initialData ? "patch" : "post",
    },
  });

  const onSubmit: SubmitHandler<ICategory> = async (data) => {
    // Prepare the data to send by removing internal fields
    const dataToSend = {
      name: data.name,
      status: data.status
    };

    await postData(dataToSend);
    if (!error) {
      alert(initialData ? "Category updated successfully!" : "Category added successfully!");
      reset();
      onCancel();
    }
  };
  
  useEffect(() => {
    initialData && reset(initialData);
  }, [initialData, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Category Name" id="name" required>
          <input
            {...register("name", {
              required: "Category name is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </FormField>

        <FormField label="Status" id="status" required>
          <select
            {...register("status")}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>

        <div className="flex justify-between pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={`px-4 py-2 text-white rounded-md ${
              initialData ? "bg-yellow-400 hover:bg-yellow-700" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : (initialData ? "Update Category" : "Add Category")}
          </button>
        </div>
      </form>
      {/* Error: {error instanceof Error ? error.message : String(error)} */}
    </div>
  );
};

export default CategoryForm;