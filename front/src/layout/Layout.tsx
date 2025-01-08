import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type props = {
    header?: boolean,
    footer?: boolean,
    children: React.ReactNode
}

const RootLayout: React.FC<props> = ({header = true, footer = true, children}) => {
    return (
      <main className="bg-slate-800 text-white min-h-svh">
        {header && <Header />}
        <div className="content">{children}</div>
        {footer && <Footer />}
      </main>
    );
};

export default RootLayout