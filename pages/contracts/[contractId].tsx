import { Props } from "@/components/layout";
import { UserContext } from "context/user";
import { useRouter } from "next/router";
import { useFetch } from "@/components/front-utils";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { onSetVal } from "../../utils/utils";
import {
  Products,
  pricesAbc10,
  pricesAbc20,
  contractDuration,
} from "domain/data/contract/contract-utils";
import { UserPatient } from "domain/data/patient/patient";

export default function ContractEditPage(props: Props) {
  const router = useRouter();
  const { contractToEdit } = useContext(UserContext);
  const [product, setProduct] = useState<Products>(contractToEdit!.product);
  const [duration, setDuration] = useState<contractDuration>(
    contractToEdit!.duration as contractDuration
  );
  const [price, setPrice] = useState<pricesAbc10 | pricesAbc20>(
    contractToEdit!.price as pricesAbc10 | pricesAbc20
  );
  const [alert, setAlert] = useState<String>("");
  const defaultPatients: UserPatient[] = [];
  const [patients, setPatients] = useState<UserPatient[]>(defaultPatients);

  const productOptions = [
    <option value="abc20">ABC vial 20mg/ml</option>,
    <option value="abc10">ABC vial 10mg/ml</option>,
  ];

  const durationOptions = [
    <option value="9">9 months</option>,
    <option value="12">12 months</option>,
  ];

  const abc10Prices = (
    <div className="mb-3">
      <label htmlFor="product" className="form-label">
        Price
      </label>
      <select
        className="form-select"
        id="product"
        required
        onInput={(e) => onSetVal(e, setPrice, setAlert)}
      >
        <option value={pricesAbc10.min}>{pricesAbc10.min}</option>
        <option value={pricesAbc10.avg}>{pricesAbc10.avg}</option>
        <option value={pricesAbc10.max}>{pricesAbc10.max}</option>
      </select>
    </div>
  );

  const abc20Prices = (
    <div className="mb-3">
      <label htmlFor="product" className="form-label">
        Price
      </label>
      <select
        className="form-select"
        id="product"
        required
        onInput={(e) => onSetVal(e, setPrice, setAlert)}
      >
        <option value={pricesAbc20.min}>{pricesAbc20.min}</option>
        <option value={pricesAbc20.avg}>{pricesAbc20.avg}</option>
        <option value={pricesAbc20.max}>{pricesAbc20.max}</option>
      </select>
    </div>
  );

  const getSelectValues = (criteria: string, array: any[]) => {
    const option1 = array.find((i) => i.props.value === criteria);
    const filtered = array.filter((i) => i.props.value !== criteria);
    return [option1, ...filtered];
  };

  const addToContract = async (e: SyntheticEvent, userId: string) => {
    e.preventDefault();
    await useFetch("/api/patients", "PATCH", {
      contractId: contractToEdit!._id,
      userId,
    });

    setAlert("Contract Updated Successfully");

    setTimeout(() => {
      setAlert("");
      router.push("/contracts");
    }, 2000);
  };

  const onSubmitData = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      product,
      duration,
      price,
      id: contractToEdit!._id,
    };

    const resData = await useFetch("/api/contracts", "PUT", data);
    setAlert("Contract Updated Successfully");

    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  if (contractToEdit) {
    useEffect(() => {
      const fetchData = async () => {
        const data = await useFetch("/api/patients/");
        const { users } = data;
        setPatients(users);
      };

      fetchData();
    }, []);
    return (
      <div className="container">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-md-6 mx-auto text-center">
              <h1>Fill in the form to edit a contract</h1>

              <div className="mb-3">
                <label htmlFor="product" className="form-label">
                  Product
                </label>
                <select
                  className="form-select"
                  id="product"
                  required
                  onInput={(e) => onSetVal(e, setProduct, setAlert)}
                >
                  {getSelectValues(contractToEdit.product, productOptions)}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="duration" className="form-label">
                  Duration
                </label>
                <select
                  className="form-select"
                  id="duration"
                  required
                  onInput={(e) => onSetVal(e, setDuration, setAlert)}
                >
                  {getSelectValues(
                    contractToEdit.duration.toString(),
                    durationOptions
                  )}
                </select>
              </div>

              {product === "abc10" && abc10Prices}

              {product === "abc20" && abc20Prices}

              <div className="d-grid gap-2  mb-5">
                <button className="btn btn-primary" onClick={onSubmitData}>
                  Update
                </button>
              </div>
              <div className="bg-success">
                <p>{alert}</p>
              </div>
            </div>
            <div
              className="col-sm-12 col-md-7 mx-auto text-center"
              key={Math.random()}
            >
              <h1>Add a user to the current contract</h1>
              {patients.map((i) => (
                <div className="card text-dark mt-5 mb-5" key={Math.random()}>
                  <p>First Name: {i.firstName}</p>
                  <p>Last Name: {i.lastName}</p>
                  <p>Age: {i.age}</p>
                  <p>Cancer Stage: {i.stage}</p>
                  <button
                    className="btn btn-dark"
                    onClick={(event) => addToContract(event, i._id)}
                  >
                    Add To Contract
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
