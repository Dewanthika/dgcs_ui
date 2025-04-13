import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../../components/ui/FormField";
import useApiFetch from "../../hooks/useApiFetch";
import ICategory from "../../types/ICategory";

interface ICategoryFormProps {
  onCancel: () => void;
}

const CategoryForm = ({ onCancel }: ICategoryFormProps) => {
  const {
    register,
    handleSubmit,
    control,
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
    url: `/category/`,
    options: {
      method: "post",
    },
  });

  const onSubmit: SubmitHandler<ICategory> = async (data) => {
    await postData(data);
    if (!error) {
      reset();
      onCancel();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Postal Code" id="postal_code" required>
          <input
            {...register("name", {
              required: "Postal code is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
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
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white">
            {"Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
