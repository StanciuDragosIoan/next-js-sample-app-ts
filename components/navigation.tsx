import { UserContext } from "context/user";
import Link from "next/link";
import { useContext } from "react";

export default function Navigation() {
  const { userType, userEmail } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-sm bg-dark">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-light" href="/">
              MediSys
            </Link>
          </li>
          {userType === "admin" && (
            <li className="nav-item">
              <Link className="nav-link text-light" href="/contracts">
                Contracts
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link text-light" href="/patients">
              Patients
            </Link>
          </li>
        </ul>
        <a className="navbar-brand text-light d-flex" href="#">
          {userEmail}__
          {userType}
        </a>
      </div>
    </nav>
  );
}
