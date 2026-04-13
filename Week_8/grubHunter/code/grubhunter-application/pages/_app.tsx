import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/layout.css";
import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";

const GrubHunterApp = ({ Component, pageProps }: AppProps) => {
  const { session, ...rest } = pageProps;

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...rest} />
      </Layout>
    </SessionProvider>
  );
};

export default GrubHunterApp;
