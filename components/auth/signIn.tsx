import { Dispatch, SetStateAction, useContext, useState } from "react";
import { UserContext } from "context/user";
import { useFetch } from "../front-utils";
import { onSetVal } from "utils/utils";
import { UserTypes } from "domain/data/user/user-access.types";

export default function SingInForm() {
  const { setUserEmail, setType, setUserCompany, setUserId } =
    useContext(UserContext);
  const { setLogged } = useContext(UserContext);
  const [email, setEmail] = useState<String | UserTypes>("");
  const [password, setPassword] = useState<String | UserTypes>("");
  const [err, setErr] = useState<String | UserTypes>("");

  const onSubmit = async () => {
    if (email === "" || password === "") {
      setErr("Bad input T__T...");
    } else {
      const data = {
        email,
        password,
      };

      const resData = await useFetch("/api/signin", "POST", data);

      const { mail, type, company, userId } = resData;
      setUserEmail(mail);
      setType(type);
      setUserId!(userId);
      setUserCompany(company);
      setLogged(true);
    }
  };

  return (
    <div className="min-vh-100 bg-dark text-white pt-5">
      <div className="container pt-5">
        <div className="row pt-5">
          <div className="col-sm-12 col-md-6 mx-auto text-center bg-secondary mt-5 p-5">
            <h1>Please sign in!</h1>
            {err !== "" && <h1 className="bg-danger">{err}</h1>}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                onInput={(e) => onSetVal(e, setEmail)}
              />
              <div id="emailHelp" className="form-text text-light">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onInput={(e) => onSetVal(e, setPassword)}
              />
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-primary" onClick={onSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
