import { useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import FormField from "../../components/ui/FormField";
import UserRoleEnum from "../../constant/userRoleEnum";
import UserStatusEnum from "../../constant/userStatusEnum";
import useApiFetch from "../../hooks/useApiFetch";
import IUser from "../../types/IUser";

interface UserFormProps {
  initialData?: IUser;
  onCancel: () => void;
}

const UserForm = ({ initialData, onCancel }: UserFormProps) => {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      phone: "",
      DOB: "",
      address: "",
      city: "",
      district: "",
      postal_code: "",
      userType: UserRoleEnum.INDIVIDUAL,
      status: UserStatusEnum.ACTIVE,
      password: "",
      passwordConfirm: "",
      companyName: "",
      businessRegNo: "",
      contactPerson: "",
      businessRegImage: "",
    },
  });

  const userRole = useWatch({ control, name: "userType" });

  const [activeTab, setActiveTab] = useState<string>("basic");
  const {
    postData,
    isLoading: isUserCreateLoading,
    error,
  } = useApiFetch<FormData>({
    url: `/user/`,
    options: {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  const isLoading = isUserCreateLoading;

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const formData = new FormData();

    // Append text fields
    formData.append("fName", data.fName);
    formData.append("lName", data.lName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("DOB", data.DOB);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("district", data.district);
    formData.append("postal_code", data.postal_code);
    formData.append("userType", data.userType);
    formData.append("status", data.status);
    formData.append("password", data.password);

    if (data.passwordConfirm) delete data.passwordConfirm;
    if (data.companyName) formData.append("companyName", data.companyName);
    if (data.businessRegNo)
      formData.append("businessRegNo", data.businessRegNo);
    if (data.contactPerson)
      formData.append("contactPerson", data.contactPerson);

    if (data.businessRegImage) {
      let value: File | string | undefined;
      if (data.businessRegImage && data.businessRegImage.length > 0) {
        value = data.businessRegImage[0];
      } else {
        value = data.businessRegImage;
      }
      formData.append("file", value);
    }

    try {
      await postData(formData);
      if (!error || !isLoading) {
        onCancel();
        reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {["basic", "account", "company"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            disabled={
              tab === "company" &&
              userRole.toLowerCase() !== UserRoleEnum.COMPANY.toLowerCase()
            }
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
          >
            {tab === "basic"
              ? "Basic Info"
              : tab === "account"
              ? "Account Details"
              : "Company Info"}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Tab */}
        {activeTab === "basic" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="First Name" id="fname" required>
                <input
                  {...register("fName", { required: "First name is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.fName && (
                  <p className="text-red-500">{errors.fName.message}</p>
                )}
              </FormField>

              <FormField label="Last Name" id="lname" required>
                <input
                  {...register("lName", { required: "Last name is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.lName && (
                  <p className="text-red-500">{errors.lName.message}</p>
                )}
              </FormField>
            </div>

            <FormField label="Email" id="email" required>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </FormField>

            <FormField label="Phone" id="phone" required>
              <input
                {...register("phone", { required: "Phone number is required" })}
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </FormField>

            <FormField label="Date of Birth" id="dob" required>
              <input
                {...register("DOB", { required: "Date of birth is required" })}
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.DOB && (
                <p className="text-red-500">{errors.DOB.message}</p>
              )}
            </FormField>

            {/* Address Section */}
            <h2>Address</h2>
            <hr />
            <div className="grid grid-cols-4 gap-4">
              <FormField label="Address" id="address" required>
                <input
                  {...register("address", { required: "Address is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </FormField>

              <FormField label="City" id="city" required>
                <input
                  {...register("city", { required: "City is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </FormField>

              <FormField label="District" id="district" required>
                <input
                  {...register("district", {
                    required: "District is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </FormField>

              <FormField label="Postal Code" id="postal_code" required>
                <input
                  {...register("postal_code", {
                    required: "Postal code is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </FormField>
            </div>
          </div>
        )}

        {/* Account Details Tab */}
        {activeTab === "account" && (
          <div className="space-y-4">
            <FormField label="User Role" id="userRole" required>
              <select
                {...register("userType")}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Individual">Individual Customer</option>
                <option value="Company">Company Customer</option>
              </select>
            </FormField>

            <FormField label="Status" id="status" required>
              <select
                {...register("status")}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </FormField>

            {!isEditing && (
              <>
                <FormField label="Password" id="password" required>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </FormField>

                <FormField
                  label="Confirm Password"
                  id="passwordConfirm"
                  required
                >
                  <input
                    {...register("passwordConfirm", {
                      required: "Confirm password",
                    })}
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </FormField>
              </>
            )}
          </div>
        )}

        {/* Company Information Tab */}
        {activeTab === "company" &&
          userRole.toLowerCase() === UserRoleEnum.COMPANY.toLowerCase() && (
            <div className="space-y-4">
              <FormField label="Company Name" id="companyName" required>
                <input
                  {...register("companyName", {
                    required: "Company name is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </FormField>

              <FormField
                label="Business Registration Number"
                id="businessRegNo"
                required
              >
                <input
                  {...register("businessRegNo", {
                    required: "Business reg. number is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </FormField>
              <input
                type="file"
                accept="image/*"
                {...register("businessRegImage", {
                  required: "Image is required",
                })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

        {/* Form Actions */}
        <div className="flex justify-between pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white">
            {isEditing ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
