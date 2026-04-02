import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/layout.css";
import Layout from "@/components/layout";

const GrubHunterApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default GrubHunterApp;
