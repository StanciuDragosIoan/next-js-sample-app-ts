import { UserContext } from "context/user";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { onSetVal } from "utils/utils";
import { useFetch } from "./front-utils";
import { CancerStages } from "domain/data/patient/patient";

export default function UpdatePatient() {
  const { userId } = useContext(UserContext);
  const [age, setAge] = useState("0");
  const [stage, setStage] = useState<CancerStages>(CancerStages.one);
  const [alert, setAlert] = useState<String>("");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    stage: "",
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      age,
      stage,
      userId,
    };

    await useFetch("/api/patients", "PUT", data);

    setAlert("Data updated successfully");
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await useFetch(`/api/patients/${userId}`);
      const { user } = data;
      setUser(user);
    };

    fetchData();
  }, [alert]);

  return (
    <>
      <h3>Fill in the form below to update your data</h3>

      <div className="row">
        <div className="col-md-4 col-sm-12 mx-auto">
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              required
              placeholder="enter age"
              onInput={(e) => onSetVal(e, setAge)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="product" className="form-label">
              Cancer Stage
            </label>
            <select
              className="form-select"
              id="product"
              required
              onInput={(e) => onSetVal(e, setStage)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div className="bg-success text-center">
            <p>{alert}</p>
          </div>

          <div className="d-grid gap-2">
            <button onClick={onSubmit} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>

        {user.firstName !== "" && (
          <div className="row">
            <div className="col text-center mt-5">
              <h1>Your Information</h1>
              <p>First name: {user.firstName}</p>
              <p>Last name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Age : {user.age}</p>
              <p>Illness progression stage: {user.stage}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
