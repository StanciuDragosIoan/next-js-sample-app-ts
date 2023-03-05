import CreatePatient from "@/components/createPatient";
import UpdatePatient from "@/components/updatePatient";
import { UserContext } from "context/user";
import { useContext, useEffect, useState } from "react";

export default function PatientsPage() {
  const { userType } = useContext(UserContext);

  return userType === "admin" ? (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h1>Patients Admin page here</h1>
          <CreatePatient />
        </div>
      </div>
    </div>
  ) : (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h1>Patients user page</h1>
          <UpdatePatient />
        </div>
      </div>
    </div>
  );
}
