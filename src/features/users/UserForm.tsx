import { useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import FormField from "../../components/ui/FormField";
import UserRoleEnum from "../../constant/userRoleEnum";
import UserStatusEnum from "../../constant/userStatusEnum";
import IUser from "../../types/IUser";
import useApiFetch from "../../hooks/useApiFetch";

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

    // if (data.businessRegImage && data.businessRegImage.length > 0) {
    //   formData.append("file", data.businessRegImage[0]);
    // }

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
        // navigator(-1);
        // reset();
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
      {/* Basic Information Tab */}
      {/* {activeTab === "basic" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="First Name" id="fname" required>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </FormField>

            <FormField label="Last Name" id="lname" required>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </FormField>
          </div>

          <FormField label="Email" id="email" required>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>

          <FormField label="Phone" id="phone" required>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>

          <FormField label="Date of Birth" id="dob" required>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>
          <h2>Address</h2>
          <hr />
          <div className="grid grid-cols-4 gap-4">
            <FormField label="Address" id="address" required>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </FormField>
            <FormField label="City" id="city" required>
              <input
                id="city"
                name="city"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </FormField>
            <FormField label="District" id="district" required>
              <input
                id="district"
                name="district"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </FormField>
            <FormField label="Postal Code" id="postal_code" required>
              <input
                id="postal_code"
                name="postal_code"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </FormField>
          </div>
        </div>
      )} */}

      {/* Account Details Tab */}
      {/* {activeTab === "account" && (
        <div className="space-y-4">
          <FormField label="User Role" id="userRole" required>
            <select
              id="userRole"
              name="userRole"
              value={formData.userRole}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="individual">Individual Customer</option>
              <option value="company">Company Customer</option>
            </select>
          </FormField>

          <FormField label="Status" id="status" required>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </FormField>

          {!isEditing ? (
            <>
              <FormField
                label="Password"
                id="password"
                required
                error={passwordError}
              >
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  required
                />
              </FormField>

              <FormField
                label="Confirm Password"
                id="passwordConfirm"
                required
                error={passwordError}
              >
                <input
                  type="password"
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  className={`w-full p-2 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  required
                />
              </FormField>
            </>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <p className="text-yellow-700 text-sm">
                Password fields are not shown when editing a user. To change a
                user's password, please use the reset password function.
              </p>
            </div>
          )}
        </div>
      )} */}

      {/* Company Information Tab */}
      {/* {activeTab === "company" && formData.userRole === "company" && (
        <div className="space-y-4">
          <FormField label="Company Name" id="companyName" required>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>

          <FormField
            label="Business Registration Number"
            id="businessRegNo"
            required
          >
            <input
              type="text"
              id="businessRegNo"
              name="businessRegNo"
              value={formData.businessRegNo}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </FormField>

          <FormField label="Contact Person" id="contactPerson">
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </FormField>
        </div>
      )} */}

      {/* Form Actions */}
      {/* <div className="flex justify-between pt-4 border-t">
        <div>
          {activeTab === "basic" && formData.userRole === "company" && (
            <button
              type="button"
              onClick={() => setActiveTab("company")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next: Company Information
            </button>
          )}
          {activeTab === "account" && formData.userRole === "company" && (
            <button
              type="button"
              onClick={() => setActiveTab("company")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next: Company Information
            </button>
          )}
          {activeTab === "company" && (
            <button
              type="button"
              onClick={() => setActiveTab("basic")}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Back to Basic Information
            </button>
          )}
        </div>
        <div className="flex space-x-3">
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
            {isEditing ? "Update User" : "Add User"}
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default UserForm;
