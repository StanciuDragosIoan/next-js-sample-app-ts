import SingInForm from "@/components/auth/signIn";
import { UserContext } from "context/user";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function SingInPage() {
  const { isLogged } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
    if (isLogged) {
      router.replace("/");
    }
  });

  return !isLogged ? <SingInForm /> : "";
}
