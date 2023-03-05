import { UserContext } from "context/user";
import { Contract } from "domain/data/contract/contract-utils";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { dataFetcher } from "./front-utils";
import { onSetVal } from "utils/utils";
import {
  Products,
  pricesAbc10,
  pricesAbc20,
  contractDuration,
} from "domain/data/contract/contract-utils";

export default function CreateContract() {
  const { userCompany, setContractToEdit } = useContext(UserContext);
  const [product, setProduct] = useState<Products>(Products.abc10);
  const [price, setPrice] = useState<pricesAbc10 | pricesAbc20>(
    pricesAbc10.min
  );
  const [duration, setDuration] = useState<contractDuration>(
    contractDuration.nine
  );
  const [alert, setAlert] = useState<String>("");
  const [contracts, setContracts] = useState<Contract[]>([]);

  const resetForm = () => {
    setProduct(Products.abc10);
    setPrice(pricesAbc10.min);
    setDuration(contractDuration.nine);
    setAlert("");
  };

  const onSubmitData = async () => {
    const data = {
      price,
      product,
      duration,
      userCompany,
      installment: (+price / +duration).toFixed(2),
    };

    await dataFetcher("/api/contracts", "POST", data);

    setAlert("Contract created successfully.");

    setTimeout(() => {
      resetForm();
    }, 2000);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataFetcher("/api/contracts");
      const { contracts } = data;
      setContracts(contracts);
    };

    fetchData();
  }, [alert]);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-md-6 mx-auto text-center">
          <h1>Fill in the form to create a contract</h1>

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
              <option value="abc10">ABC vial 10mg/ml</option>
              <option value="abc20">ABC vial 20mg/ml</option>
            </select>
          </div>

          {product === "abc10" && abc10Prices}

          {product === "abc20" && abc20Prices}

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
              <option value={contractDuration.nine}>
                {contractDuration.nine} months
              </option>
              <option value={contractDuration.twelve}>
                {contractDuration.twelve} months
              </option>
            </select>
          </div>

          <div className="d-grid gap-2  mb-5">
            <button className="btn btn-primary" onClick={onSubmitData}>
              Submit
            </button>
          </div>
          <div className="bg-success">
            <p>{alert}</p>
          </div>
        </div>
      </div>
      {contracts.length > 0 ? (
        <div className="row">
          <div className="col-sm-12 col-md-6 mx-auto">
            <h3>View All contracts</h3>
          </div>

          {contracts.map((i: Contract) => {
            return (
              <div className="card m-2 bg-dark pt-2" key={i._id}>
                <h5>Company: {i.userCompany}</h5>
                <p>Duration: {i.duration} months</p>
                <p>price: {i.price}</p>
                <p>Contract product: {i.product}</p>
                <p>Contract status: {i.status}</p>
                <Link
                  onClick={() => setContractToEdit(i)}
                  className="bg-info"
                  href={`/contracts/${i._id}`}
                >
                  Edit contract
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
