import { ReactNode } from "react";

import Header from "@/components/header";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="layout-grid">{children}</main>
    </>
  );
};

export default Layout;
