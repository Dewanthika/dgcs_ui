import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import ISigninInputs from "../../types/ISigninInputs";

const LoginPage = () => {
  const { signin, isLoading, errorMessage, setErrorMessage } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninInputs>();

  const onSubmit: SubmitHandler<ISigninInputs> = async (data) => {
    const { email, password } = data;
    await signin({ email, password });
  };

  const onInputChange = () => {
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">Logo</h1>
          </div>

          {isLoading && <h5>Loading</h5>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm text-gray-600">
                User Name
              </label>
              <input
                type="text"
                id="email"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="Name"
                required
                {...register("email", {
                  required: "email is required",
                  onChange: onInputChange,
                })}
              />
              <span className="text-red">{errors.email?.message}</span>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                placeholder="Password"
                required
                {...register("password", {
                  required: "Password is required",
                  onChange: onInputChange,
                })}
              />
              <span className="text-red">{errors.password?.message}</span>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-black text-white py-3 font-medium uppercase"
              >
                LOG IN
              </button>
            </div>

            <div className="text-center space-y-2">
              <Link
                to="/forgot-password"
                className="text-gray-500 text-sm hover:underline block"
              >
                Forgot Password
              </Link>
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-black font-medium hover:underline"
                >
                  Register
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
            alt="Login"
            className="w-screen h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
