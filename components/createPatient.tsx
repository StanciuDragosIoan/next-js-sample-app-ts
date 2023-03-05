import { UserTypes } from "domain/data/user/user-access.types";
import { useState } from "react";
import { onSetVal } from "utils/utils";
import { dataFetcher } from "./front-utils";

export default function CreatePatient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("0");
  const [cancerStage, setCancerStage] = useState("1");
  const [userType] = useState(UserTypes.patient);
  const [err, setErr] = useState<String>("");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge("0");
    setCancerStage("1");
    setErr("");
  };

  const onSubmit = async () => {
    if (firstName === "" || lastName === "" || email === "" || age === "") {
      setErr("Bad input T__T...");
    } else {
      const data = {
        firstName,
        lastName,
        email,
        age,
        userType,
        cancerStage,
        password: "default_account",
      };

      await dataFetcher("/api/signup", "POST", data);

      setErr("User created..");
      setTimeout(() => {
        resetForm();
      }, 2000);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-md-6 mx-auto text-center">
          <h1>CreatePatient comp here</h1>
          {err !== "" && <h1 className="bg-info">{err}</h1>}
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
              We`&apos;`ll never share their email with anyone else.
            </div>
          </div>
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            required
            placeholder="enter patient age"
            onInput={(e) => onSetVal(e, setAge, setErr)}
          />

          <label htmlFor="product" className="form-label">
            Cancer Stage
          </label>
          <select
            className="form-select"
            id="product"
            required
            onInput={(e) => onSetVal(e, setCancerStage, setErr)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <div className="d-grid gap-2 mt-5">
            <button className="btn btn-primary" onClick={onSubmit}>
              Create Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
