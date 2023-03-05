import { onSetVal } from "utils/utils";
import Link from "next/link";
import { useState } from "react";
import { useFetch } from "../front-utils";

import { UserTypes } from "domain/data/user/user-access.types";

export default function SingUpForm() {
  const [firstName, setFirstName] = useState<String | UserTypes>("");
  const [lastName, setLastName] = useState<String | UserTypes>("");
  const [email, setEmail] = useState<String | UserTypes>("");
  const [password, setPassword] = useState<String | UserTypes>("");
  const [userType, setType] = useState<String | UserTypes>(UserTypes.default);
  const [err, setErr] = useState<String | UserTypes>("");

  const onSubmit = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      setErr("Bad input T__T...");
    } else {
      const data = {
        firstName,
        lastName,
        email,
        password,
        userType,
      };

      await useFetch("/api/signup", "POST", data);
    }
  };

  return (
    <div className="min-vh-100 bg-dark text-white pt-5">
      <div className="container pt-5">
        <div className="row pt-5">
          <div className="col-sm-12 col-md-6 mx-auto text-center bg-secondary mt-5 p-5">
            <h1>Please sign up!</h1>
            {err !== "" && <h1 className="bg-danger">{err}</h1>}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                placeholder="enter first name"
                onInput={(e) => onSetVal(e, setFirstName, setErr)}
              />

              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                placeholder="enter last name"
                onInput={(e) => onSetVal(e, setLastName, setErr)}
              />
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                onInput={(e) => onSetVal(e, setEmail, setErr)}
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
                onInput={(e) => onSetVal(e, setPassword, setErr)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="product" className="form-label">
                Price
              </label>
              <select
                className="form-select"
                id="product"
                required
                onInput={(e) => onSetVal(e, setType, setErr)}
              >
                <option value="patient">Patient</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-primary" onClick={onSubmit}>
                Submit
              </button>
            </div>
            <div id="emailHelp" className="form-text text-light">
              Already have an account?{" "}
              <Link href="/signin" target="_blank">
                Sing in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
