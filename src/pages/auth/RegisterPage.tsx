import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import FormField from "../../components/ui/FormField";
import useAuth from "../../hooks/useAuth";
import IUser from "../../types/IUser";
import UserRoleEnum from "../../constant/userRoleEnum";

const RegisterPage = () => {
  const { signup, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUser>();

  const userRole = useWatch({ control, name: "userType" });

  const onSubmit = (data: IUser) => {
    signup(data);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="text-2xl font-bold text-center">
            <img
              src="/Logo.png"
              alt="Admin"
              className="w-[200px] h-full object-cover m-auto"
            />
          </Link>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Type */}
            <div className="space-y-2">
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
            </div>

            {userRole?.toLowerCase() === UserRoleEnum.COMPANY.toLowerCase() && (
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

            {/* First Name */}
            <div className="space-y-2">
              <FormField label="First Name" id="fname" required>
                <input
                  {...register("fName", { required: "First name is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.fName && (
                  <p className="text-red-500">{errors.fName.message}</p>
                )}
              </FormField>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
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

            <div className="space-y-2">
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
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </FormField>
            </div>
            <div>
              <FormField label="Date of Birth" id="dob" required>
                <input
                  {...register("DOB", {
                    required: "Date of birth is required",
                  })}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.DOB && (
                  <p className="text-red-500">{errors.DOB.message}</p>
                )}
              </FormField>
            </div>

            {/* Address Fields */}
            <FormField label="Address" id="address" required>
              <input
                {...register("address", { required: "Address is required" })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </FormField>
            <div className="grid grid-cols-3 gap-4">
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

            <div>
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
            </div>

            {/* Password */}
            <FormField label="Password" id="password" required>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </FormField>

            <FormField label="Confirm Password" id="passwordConfirm" required>
              <input
                {...register("passwordConfirm", {
                  required: "Confirm password",
                })}
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </FormField>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-black text-white py-3 font-medium uppercase"
                disabled={isLoading}
              >
                REGISTER
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-black font-medium hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-300">
        <div className="h-full flex items-center justify-center">
          <img
            src="/login_image.webp"
            alt="Register"
            className="w-screen h-full object-container"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
