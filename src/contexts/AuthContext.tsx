import { createContext, ReactNode, useEffect, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import GeneralEnum from "../constant/generalEnum";
import PathsEnum from "../constant/pathsEnum";
import authAxiosInstance from "../helpers/authHelper";
import { handleAxiosError } from "../helpers/axiosHelper";
import { isValidToken } from "../helpers/generalHelper";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchUserByEmail } from "../store/slice/userSlice";
import { useAppDispatch } from "../store/store";
import ISigninInputs from "../types/ISigninInputs";
import IUser from "../types/IUser";

interface IAuthContextProps {
  children: ReactNode;
}

interface IAuthProvider {
  errorMessage: string;
  isAuth?: boolean;
  isLoading: boolean;
  setErrorMessage: (value: string) => void;
  signin: (value: ISigninInputs) => Promise<void>;
  signout: () => void;
  signup: (value: IUser) => Promise<void>;
}

interface ILoginResponse {
  access_token: string;
}

const AuthProvider = createContext<IAuthProvider | null>(null);

const AuthContext = ({ children }: IAuthContextProps) => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuth, setAuth] = useState<boolean>();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const { storedValue, setValue, removeValue } = useLocalStorage({
    key: GeneralEnum.ACCESSTOKEN,
    initialValue: "",
  });

  const onSuccess = (token: string, value: string) => {
    setAuth(true);
    setValue(token);
    navigate("/dashboard");
    setLoading(false);
    getUserProfile(value);
  };

  const getUserProfile = async (value: string) => {
    await dispatch(fetchUserByEmail(value));
  };

  const signin = async ({ email, password }: ISigninInputs) => {
    try {
      setLoading(true);
      const res = await authAxiosInstance.post<ILoginResponse>(
        PathsEnum.LOGIN,
        {
          email,
          password,
        }
      );

      const value = email;
      onSuccess(res.data.access_token, value!);
    } catch (error) {
      console.error("Signin failed", error);
      setErrorMessage(
        handleAxiosError(error as string) || "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const signout = () => {
    removeValue();
    setAuth(false);
    redirect(PathsEnum.LOGIN);
  };

  const signup = async (data: IUser) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Append form data only if they exist
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

      // Make a POST request to the register endpoint
      const response = await authAxiosInstance.post(
        PathsEnum.REGISTER,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("User registered successfully", response.data);
      onSuccess(response.data.accessToken, data.email);
    } catch (error) {
      console.error("Signup failed", error);
      setErrorMessage(
        handleAxiosError(error as string) || "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isValidToken(storedValue)) {
      signout();
    } else {
      navigate(location.pathname);
      setAuth(true);
    }
  }, [storedValue]);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  return (
    <AuthProvider.Provider
      value={{
        errorMessage,
        isAuth,
        isLoading,
        setErrorMessage,
        signin,
        signout,
        signup,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export { AuthContext, AuthProvider };
