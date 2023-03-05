import { Contract } from "domain/data/contract/contract-utils";
import { createContext, useEffect, useState } from "react";

interface UserContextType {
  isLogged: boolean;
  setLogged: Function;
  userType?: string;
  userEmail?: string;
  setType: Function;
  setUserEmail: Function;
  userCompany?: string;
  contractToEdit?: any;
  setUserCompany: Function;
  setContractToEdit: Function;
  userId?: string;
  setUserId?: Function;
}

export const UserContext = createContext<UserContextType>({
  isLogged: false,
  setLogged: () => true,
  setType: () => true,
  setUserEmail: () => true,
  setUserCompany: () => true,
  setContractToEdit: () => true,
  setUserId: () => true,
});

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const UserContextProvider = (props: Props) => {
  const { children } = props;
  const [isLogged, setLogged] = useState(true);
  const [userType, setType] = useState("admin");
  const [userId, setUserId] = useState("640476e5f0ad4f3007b8a652"); // patient 640476f2f0ad4f3007b8a653 admin 640476e5f0ad4f3007b8a652
  const [userEmail, setUserEmail] = useState("test@test.com");
  const [userCompany, setUserCompany] = useState("someCompany.LTD");
  const [contractToEdit, setContractToEdit] = useState<Contract>();

  useEffect(() => {}, []);
  return (
    <UserContext.Provider
      value={{
        isLogged,
        setLogged,
        setType,
        userType,
        userEmail,
        setUserEmail,
        userCompany,
        setUserCompany,
        contractToEdit,
        setContractToEdit,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
