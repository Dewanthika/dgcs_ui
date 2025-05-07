import { useForm, type SubmitHandler } from "react-hook-form";
import FormField from "../../components/ui/FormField";
import ICompany from "../../types/ICompany";
import useFetch from "../../hooks/useFetch";
import { useMemo } from "react";
import IUser from "../../types/IUser";
import UserRoleEnum from "../../constant/userRoleEnum";

interface CompanyFormProps {
  initialData?: ICompany;
  onSubmit: (data: Omit<ICompany, "_id">) => void;
  onCancel: () => void;
}
type FormData = Omit<ICompany, "_id">;

const CompanyForm = ({ initialData, onSubmit, onCancel }: CompanyFormProps) => {
  const isEditing = !!initialData;

  const { data: users } = useFetch<IUser[]>({
    url: "/user",
    initialLoad: true,
  });

  const companyUser = useMemo(() => {
    return users
      ?.filter((user) => user.userType === UserRoleEnum.COMPANY)
      .map((user) => {
        return {
          value: user._id,
          label: user.fName,
        };
      });
  }, [users]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      paymentTerms: initialData?.paymentTerms || "Net 30 Days",
      creditLimit: initialData?.creditLimit || 0,
      status: initialData?.status || "Inactive",
      userId: initialData?.userId || "",
      discount: initialData?.discount || 0,
    },
  });

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <FormField label="Company User" id="cmpName" required>
        <select
          {...register("userId")}
          className="w-full p-2 border border-gray-300 rounded-md"
          defaultValue={initialData?.userId || ""}
        >
          <option value="" disabled>
            Select
          </option>

          {companyUser?.map((user) => {
            return <option value={user.value}>{user.label}</option>;
          })}
        </select>
      </FormField>

      <FormField label="Credit Limit" id="creditLimit" required>
        <input
          type="number"
          id="creditLimit"
          {...register("creditLimit", {
            required: "Credit Limit is required",
            valueAsNumber: true,
            min: { value: 0, message: "Credit Limit cannot be negative" },
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.creditLimit && (
          <p className="text-red-600">{errors.creditLimit.message}</p>
        )}
      </FormField>

      <FormField label="Discount" id="Discount" required>
        <input
          type="number"
          id="Discount"
          {...register("discount", {
            required: "Discount is required",
            valueAsNumber: true,
            min: { value: 0, message: "Discount cannot be negative" },
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.creditLimit && (
          <p className="text-red-600">{errors.creditLimit.message}</p>
        )}
      </FormField>

      <FormField label="Payment Terms" id="paymentTerms" required>
        <select
          id="paymentTerms"
          {...register("paymentTerms", {
            required: "Payment Terms is required",
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="Net 15 Days">Net 15 Days</option>
          <option value="Net 30 Days">Net 30 Days</option>
          <option value="Net 45 Days">Net 45 Days</option>
          <option value="Net 60 Days">Net 60 Days</option>
          <option value="Due on Receipt">Due on Receipt</option>
        </select>
        {errors.paymentTerms && (
          <p className="text-red-600">{errors.paymentTerms.message}</p>
        )}
      </FormField>

      <FormField label="status" id="paymentTerms" required>
        <select
          id="paymentTerms"
          {...register("status", {
            required: "status is required",
          })}
          defaultValue={"Inactive"}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {errors.paymentTerms && (
          <p className="text-red-600">{errors.paymentTerms.message}</p>
        )}
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
          {isEditing ? "Update Company" : "Add Company"}
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
