import React from "react";
import PageHeader from "./header";
import "./styles/layoutStyles.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="layoutContainer">
        <PageHeader></PageHeader>
        <div className="main-content">{children}</div>
      </div>
    </React.Fragment>
  );
}
