import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex container my-4 justify-content-center">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
