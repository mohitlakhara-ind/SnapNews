import React from "react";
import logo from "./logo512.png"; // Import the image properly

const Logo = () => {
  return (
    <div>
      <a className="navbar-brand" href="/">
        <img
          src={logo} // Use the imported logo
          alt="Logo"
          width="30"
          height="30"
          style={{ objectFit: "contain" }} // Ensures proper scaling
        />
      </a>
    </div>
  );
};

export default Logo;
