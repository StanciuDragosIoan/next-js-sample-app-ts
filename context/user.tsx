import {
  Companies,
  Contract,
  contractDuration,
  ContractStatus,
  pricesAbc10,
  Products,
} from "domain/data/contract/contract-utils";
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
  const [isLogged, setLogged] = useState(false);
  const [userType, setType] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCompany, setUserCompany] = useState("");
  const [contractToEdit, setContractToEdit] = useState<Contract>({
    _id: "default",
    contratParties: [],
    duration: contractDuration.nine,
    installment: "default",
    price: pricesAbc10.avg,
    product: Products.abc10,
    status: ContractStatus.open,
    userCompany: Companies.abcMed,
  });

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
