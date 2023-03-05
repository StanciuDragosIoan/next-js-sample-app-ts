import { useContext, useEffect } from "react";
import { UserContext } from "context/user";
import Navigation from "./navigation";
import SingUpForm from "./auth/signUp";
import { useRouter } from "next/router";
import SingInForm from "./auth/signIn";

export type Props = {
  children?: string | JSX.Element | JSX.Element[];
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { route } = router;

  let isVal = false;
  if (route === "/signin") {
    isVal = true;
  }

  const { isLogged } = useContext(UserContext);

  useEffect(() => {}, [isLogged]);
  return isLogged ? (
    <div className="bg-secondary text-light min-vh-100">
      <Navigation />
      <div className="container">
        <div className="row">{children}</div>
      </div>
    </div>
  ) : isVal ? (
    <SingInForm />
  ) : (
    <SingUpForm />
  );
}
