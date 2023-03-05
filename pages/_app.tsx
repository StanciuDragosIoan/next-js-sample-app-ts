import "bootstrap/dist/css/bootstrap.css";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { UserContextProvider } from "context/user";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
