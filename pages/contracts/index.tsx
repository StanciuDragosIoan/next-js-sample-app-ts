import CreateContract from "@/components/createContract";
import { UserContext } from "context/user";
import { useContext } from "react";
export default function ContractsPage() {
  const { userType } = useContext(UserContext);
  return userType === "admin" ? (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h1>Contracts page here</h1>
          <CreateContract />
        </div>
      </div>
    </div>
  ) : (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h1>Admins only can access this page</h1>
        </div>
      </div>
    </div>
  );
}
