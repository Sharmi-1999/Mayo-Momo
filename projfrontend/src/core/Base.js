import React from "react";
import Menu from "./Menu";
import Footer from "./footer"

const Base = ({
  title = "My Title",
  description = "My description",
  className = "text-dark p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <Footer/>
    </div>
  );
};

export default Base;
