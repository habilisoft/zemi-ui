import React, { useState } from "react";
import axios from "axios";
import { useCompoundStore } from "@/stores/compound-store";
import { shallow } from "zustand/shallow";
import { IUser, LoginRequest } from '@/types';

type AuthContextType = {
  isAuth: boolean;
  logout: () => void;
  login: (request: LoginRequest) => Promise<IUser>
}
const AuthContext = React.createContext<AuthContextType>({ } as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(true);

  const {
    setAuthUser,
    setAuthUserLogout,
  } = useCompoundStore(
    (state) => ({
      setAuthUser: state.setAuthUser,
      setAuthUserLogout: state.setAuthUserLogout,
    }),
    shallow
  );

  const login = async (request: LoginRequest) : Promise<IUser> => {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/authenticate', request, {
        headers: {
          //Authorization: undefined,
        }
      }).then(async () => {
        const user = await getUser()
        setAuthUser(user)
        resolve(user);
      }).catch((response) => {
        reject(response);
      });
    });

  };


  const getUser = async () => {
    try {
      const getCurrentUser = axios.get("/api/v1/users/me");
      const { data } = await getCurrentUser;
      setAuthUser(data);
      setIsAuth(!data.changePasswordAtNextLogon);
      return data;
    } catch (error) {
      await axios.get("/api/v1/logout");
      setAuthUserLogout();
      return error;
    }
  };


  const logout = () => {
    axios.get("/api/v1/logout").finally(() => {
      clearCredentials();
      window.location.href = "/login";
    });
  };


  const clearCredentials = () => {
    setIsAuth(false);
    setAuthUserLogout();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;
export { AuthConsumer, AuthContext, AuthProvider };
