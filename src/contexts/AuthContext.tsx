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
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export { AuthContext, AuthProvider };

